import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import doctorModel from "../models/doctorModel.js"

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    })
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: `user  not found ` })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: `password  not match` })
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    )
    return res
      .status(200)
      .send({ success: true, message: `login   success`, token })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ success: false, message: `login controller ${error.message}` })
  }
}
const register = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(200).send({ success: false, message: `user  already ` })
    }
    const { name, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    req.body.password = hashPassword
    const newUser = new userModel(req.body)
    await newUser.save()
    return res
      .status(200)
      .send({ success: true, message: `registration  successfull ` })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ success: false, message: `register controller ${error.message}` })
  }
}

const authCtr = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId })
    user.password = undefined
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: `user  not found ` })
    } else {
      return res.status(200).send({
        success: true,
        data: user,
      })
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `auth error ${error.message}` })
  }
}

export const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" })
    await newDoctor.save()
    const adminUser = await userModel.findOne({ isAdmin: true })
    const notification = adminUser.notification
    notification.push({
      type: "apply-doctor-account",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id, { notification })
    res.status(200).send({
      success: true,
      message: "Doctors account create successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    })
  }
}

const getAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: req.body.userId,
    })
    const seennotification = user.seennotification
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = notification
    const updateUser = await user.save()
    res.status(200).send({
      success: true,
      data: updateUser,
      message: "All notification mark as read",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    })
  }
}

const deleteAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: req.body.userId,
    })
    user.notification = []
    user.seennotification = []
    const updateUser = await user.save()
    res.status(200).send({
      success: true,
      message: "Able to delete all message",
      data: updateUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({
      status: "approved",
    })
    res.status(200).send({
      success: true,
      data: doctors,
      message: "List of Doctors",
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    })
  }
}

export {
  login,
  register,
  authCtr,
  getAllDoctors,
  getAllNotification,
  deleteAllNotification,
}

import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    res.status(200).send({
      success: true,
      message: "all the doctors list",
      data: doctors,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error to get ddesire request",
    })
  }
}

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({})
    res.status(200).send({
      success: true,
      message: "all the users list",
      data: users,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error to get ddesire request",
    })
  }
}

export const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status })
    const user = await userModel.findOne({ _id: doctor.userId })
    const notification = user.notification
    notification.push({
      type: "doctor status request",
      message: `doctor account request ${status}`,
      onClickPath: "/notification",
    })
    user.isDoctor = status == "approved" ? true : false
    await user.save()
    res.status(200).send({
      success: true,
      message: "doctor staust changed",
      data: doctor,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error to get ddesire request",
      error,
    })
  }
}

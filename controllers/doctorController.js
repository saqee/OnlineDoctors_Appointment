import doctorModel from "../models/doctorModel.js"
export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId })
    res.status(200).send({
      success: true,

      message: "doctor data match",
      data: doctor,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error to find current doctor profile",
    })
  }
}

export const updataProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    )
    res.status(200).send({
      success: true,
      message: "update successfully doctor profile",
      data: doctor,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error to update current doctor profile",
    })
  }
}

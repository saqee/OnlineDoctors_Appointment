import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
  getDoctorInfo,
  updataProfile,
} from "../controllers/doctorController.js"
let router = express.Router()

router.post("/getDoctorInfo", protect, getDoctorInfo)
router.post("/updateProfile", protect, updataProfile)
export default router

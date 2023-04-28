import express from "express"
import {
  login,
  register,
  authCtr,
  applyDoctorController,
  getAllNotification,
  deleteAllNotification,
  getAllDoctors,
} from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/getuserdata", protect, authCtr)
router.post("/apply-doctor", protect, applyDoctorController)
router.post("/get-all-notification", protect, getAllNotification)
router.post("/delete-all-notification", protect, deleteAllNotification)

router.get("/getAllDoctors", protect, getAllDoctors)
export default router

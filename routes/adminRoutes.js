import express from "express"
import {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatus,
} from "../controllers/adminController.js"
import { protect } from "../middlewares/authMiddleware.js"
const router = express.Router()
router.get("/getAllUsers", protect, getAllUsersController)
router.get("/getAllDoctors", protect, getAllDoctorsController)
router.post("/changeAccountStatus", protect, changeAccountStatus)
export default router

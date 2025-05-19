import express from "express";
import {
  loginUser,
  registerUser,
  verifyUser,
  resetPassword,
  updatePassword,
  forgotPassword,
} from "../controller/userController.js";
import { authenticate } from "../middleware/auth.js";
import uploads from "../middleware/multer.js";
import { createProduct } from "../controller/productController.js";
import { validator } from "../middleware/validator.js";
import { registerUserSchema } from "../schemas/authSchema.js";

const router = express.Router();

// Auth routes
router.post("/register",validator(registerUserSchema),registerUser);
router.post("/login", loginUser);
router.post("/verify-user", verifyUser);

// Forgot & Reset Password routes
router.post("/forgot-password",forgotPassword );              // no auth required
router.post("/reset-password/:token", resetPassword);         // token from email link

// Update password (if user knows current password)
router.post("/update-password", authenticate, updatePassword);

router.post("/products",uploads.array(["productImage"]),createProduct)

export default router;

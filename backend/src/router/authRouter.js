import express from "express";
import authController from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);

export default authRouter;

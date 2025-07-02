import express from "express";
import { logout, verifyLogin } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", verifyLogin).post("/logout", logout);

export default authRouter;

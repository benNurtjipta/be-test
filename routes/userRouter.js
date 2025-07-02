import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";

const userRouter = express.Router();

userRouter.get("/ad").post("/ad/:id").post("/create", createUserCompany);

export default userRouter;

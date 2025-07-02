import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectUserRoute } from "../middleware/protectUserRoute.js";

const userRouter = express.Router();

userRouter
    .get("/ad", protectUserRoute)
    .post("/ad/:id", protectUserRoute)
    .post("/create", createUserCompany);

export default userRouter;

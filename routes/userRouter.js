import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectUserRoute } from "../middleware/protectUserRoute.js";
import { registerValidationRules, validate } from "../middleware/validation.js";

const userRouter = express.Router();

userRouter
  .get("/ad", protectUserRoute)
  .post("/ad/:id", protectUserRoute)
  .post("/create", registerValidationRules(), validate, createUserCompany);

export default userRouter;

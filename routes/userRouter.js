import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectUserRoute } from "../middleware/protectUserRoute.js";
import { registerValidationRules, validate } from "../middleware/validation.js";
import { verifyLogin } from "../controllers/auth.js";
import { getAllAds } from "../controllers/getAllAds.js";
import { applyToAd } from "../controllers/applyToAd.js";

const userRouter = express.Router();

userRouter
  .get("/ad", protectUserRoute, getAllAds)
  .post("/ad/:id", protectUserRoute, applyToAd)
  .post("/create", registerValidationRules(), validate, createUserCompany)
  .post("/auth/login", verifyLogin);

export default userRouter;

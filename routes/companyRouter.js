import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectCompanyRoute } from "../middleware/protectCompanyRoute.js";

const companyRouter = express.Router();

companyRouter.post("/create", createUserCompany);

companyRouter
  .get("/ad", protectCompanyRoute, (req, res) => {})
  .post("/ad/create", protectCompanyRoute, (req, res) => {})
  .patch("/ad/update", protectCompanyRoute, (req, res) => {})
  .delete("/ad/delete", protectCompanyRoute, (req, res) => {});

export default companyRouter;

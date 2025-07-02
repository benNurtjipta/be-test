import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";

const companyRouter = express.Router();

companyRouter.post("/create", createUserCompany);

companyRouter
  .route("/ad")
  .get((req, res) => {})
  .post("/create", (req, res) => {})
  .patch("/update", (req, res) => {})
  .delete("/delete", (req, res) => {});

export default companyRouter;

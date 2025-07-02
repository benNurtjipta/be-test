import express from "express";

const companyRouter = express.Router();

companyRouter.post("/company/create", (req, res) => {});

companyRouter
  .route("/company/ad")
  .get((req, res) => {})
  .post("/create", (req, res) => {})
  .patch("/update", (req, res) => {})
  .delete("/delete", (req, res) => {});

export default companyRouter;

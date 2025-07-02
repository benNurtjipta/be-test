import express from "express";

const companyRouter = express.Router();

companyRouter.post("/create", (req, res) => {});

companyRouter
  .route("/ad")
  .get((req, res) => {})
  .post("/create", (req, res) => {})
  .patch("/update", (req, res) => {})
  .delete("/delete", (req, res) => {});

export default companyRouter;

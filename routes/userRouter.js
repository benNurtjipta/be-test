import express from "express";

const userRouter = express.Router();

userRouter
    .get("/ad")
    .post("/ad/:id")
    .post("/create")

export default userRouter;

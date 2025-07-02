import express from "express";

const userRouter = express.Router();

userRouter.get("/ad");

userRouter.post("/ad/:id");

userRouter.post("/create");

export default userRouter;

import express from "express";
import db from "./db/db.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import errorHandler from "./middleware/errorhandler.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const PORT = process.env.PORT;

db.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

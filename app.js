import express from "express";
import db from "../db/db.js";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT;

db.connect();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/company", companyRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

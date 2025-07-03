import { generateToken } from "../libs/jwt.js";
import { comparePassword } from "../libs/password.js";
import CompanyModel from "../models/CompanyModel.js";
import UserModel from "../models/UserModel.js";

export const verifyLogin = async (req, res, next) => {
  try {
    const path = req.originalUrl;
    const { email, password } = req.body;
    let user;

    if (path.startsWith("/user")) {
      user = await UserModel.findOne({ email });
    } else if (path.startsWith("/company")) {
      user = await CompanyModel.findOne({ email });
    } else {
      return res.status(403).json({ message: "something went wrong" });
    }

    if (!user) {
      const error = new Error("Invalid username or password");
      error.statusCode = 401;
      return next(error);
    }

    const isValid = await comparePassword(password, user.hashedPassword);

    if (!isValid) {
      const error = new Error("Invalid username or password");
      error.statusCode = 401;
      return next(error);
    }

    const { _id, role } = user;

    const token = generateToken(role, _id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: `Login successful`,
      username: `${
        user.role === "applicant" ? user.firstname : user.companyName
      }`,
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

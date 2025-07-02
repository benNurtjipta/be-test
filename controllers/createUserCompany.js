import { date } from "../libs/date.js";
import { generateToken } from "../libs/jwt.js";
import { hashPassword } from "../libs/password.js";
import CompanyModel from "../models/CompanyModel.js";
import UserModel from "../models/UserModel.js";

const createUserCompany = async (req, res, next) => {
  try {
    const { role } = req.body;
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const createdAt = date();

    let newAccount;

    if (role === "applicant") {
      const { firstname, lastname } = req.body;

      newAccount = new UserModel({
        email,
        hashedPassword,
        firstname,
        lastname,
        createdAt,
      });
    } else if (role === "company") {
      const { companyName, recruiter } = req.body;

      newAccount = new CompanyModel({
        email,
        hashedPassword,
        companyName,
        recruiter,
        createdAt,
      });
    } else {
      return res.status(400).json({ message: "role not valid" });
    }

    await newAccount.save();

    const token = generateToken(role, newAccount._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: `${role} created successful`,
      username: `${
        role === "applicant" ? newAccount.firstname : newAccount.companyName
      }`,
    });
  } catch (error) {
    return next(error);
  }
};
export default createUserCompany;

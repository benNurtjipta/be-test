import { body, validationResult } from "express-validator";

const registerValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email format."),

    body("password")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter (A-Z).")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter (a-z).")

      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'
      ),

    body("role")
      .notEmpty()
      .withMessage("Role is required.")
      .isIn(["applicant", "company"])
      .withMessage('Role must be either "applicant" or "company".'),

    body("firstname")
      .if(body("role").equals("applicant"))
      .isLength({ min: 3 })
      .withMessage(
        "First name must be at least 3 characters long for applicants."
      )
      .notEmpty()
      .withMessage("First name is required for applicants."),

    body("lastname")
      .if(body("role").equals("applicant"))
      .isLength({ min: 3 })
      .withMessage(
        "Last name must be at least 3 characters long for applicants."
      )
      .notEmpty()
      .withMessage("Last name is required for applicants."),

    body("companyName")
      .if(body("role").equals("company"))
      .isLength({ min: 3 })
      .withMessage(
        "Company name must be at least 3 characters long for companies."
      )
      .notEmpty()
      .withMessage("Company name is required for companies."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors,
  });
};

export { registerValidationRules, validate };

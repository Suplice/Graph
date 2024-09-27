import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must contain at least one capital letter, one number, and one special character"
    ),
];

const errorFormatter = ({
  location,
  msg,
  param,
  value,
  path,
  nestedErrors,
}: any) => {
  return `${path}: ${msg}`;
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.formatWith(errorFormatter);

  return res.status(400).json({
    errors: extractedErrors.array(),
  });
};

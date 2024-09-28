import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const registrationSchma = Joi.object({
  firstName: Joi.string().required().min(2).messages({
    "string.empty": "First Name is required",
    "string.min": "First Name must be at least 2 characters",
  }),
  lastName: Joi.string().required().min(2).messages({
    "string.empty": "Last Name is required",
    "string.min": "Last Name must be at least 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one number and one special character",
    }),
});

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const { error } = registrationSchma.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details.reduce(
      (acc: Record<string, string[]>, err) => {
        const fieldName = err.path.join(".");
        if (!acc[fieldName]) {
          acc[fieldName] = [];
        }
        acc[fieldName].push(err.message);
        return acc;
      },
      {}
    );

    return res.status(400).json({ success: false, errors: formattedErrors });
  }

  next();
};

import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

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

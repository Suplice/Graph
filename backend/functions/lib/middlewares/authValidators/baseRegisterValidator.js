"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
const registrationSchma = joi_1.default.object({
    firstName: joi_1.default.string().required().min(2).messages({
        "string.empty": "First Name is required",
        "string.min": "First Name must be at least 2 characters",
    }),
    lastName: joi_1.default.string().required().min(2).messages({
        "string.empty": "Last Name is required",
        "string.min": "Last Name must be at least 2 characters",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is required",
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .pattern(new RegExp("(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])"))
        .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one number and one special character",
    }),
});
const validateRegistration = (req, res, next) => {
    const { error } = registrationSchma.validate(req.body, { abortEarly: false });
    if (error) {
        const formattedErrors = error.details.reduce((acc, err) => {
            const fieldName = err.path.join(".");
            if (!acc[fieldName]) {
                acc[fieldName] = [];
            }
            acc[fieldName].push(err.message);
            return acc;
        }, {});
        return res.status(400).json({ success: false, errors: formattedErrors });
    }
    next();
};
exports.validateRegistration = validateRegistration;
//# sourceMappingURL=baseRegisterValidator.js.map
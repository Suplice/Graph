"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email",
    }),
    password: joi_1.default.string().required().messages({
        "string.empty": "Password is required",
    }),
});
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
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
exports.validateLogin = validateLogin;
//# sourceMappingURL=baseLoginValidator.js.map
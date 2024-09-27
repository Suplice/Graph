"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        .withMessage("Password must contain at least one capital letter, one number, and one special character"),
];
const errorFormatter = ({ location, msg, param, value, path, nestedErrors, }) => {
    return `${path}: ${nestedErrors}`;
};
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.formatWith(errorFormatter);
    return res.status(400).json({
        errors: extractedErrors.array(),
    });
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=registerValidator.js.map
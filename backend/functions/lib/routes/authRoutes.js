"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const registerValidator_1 = require("../middlewares/authValidators/registerValidator");
const router = express_1.default.Router();
router.post("/register", registerValidator_1.registerValidator, registerValidator_1.handleValidationErrors, authController_1.default.registerUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
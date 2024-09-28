"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const baseRegisterValidator_1 = require("../middlewares/authValidators/baseRegisterValidator");
const baseLoginValidator_1 = require("../middlewares/authValidators/baseLoginValidator");
const router = express_1.default.Router();
router.post("/register", baseRegisterValidator_1.validateRegistration, authController_1.default.registerUser);
router.post("/login", baseLoginValidator_1.validateLogin);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.post("/validateToken", authController_1.default.verifyToken);
router.post("/register", authController_1.default.verifyToken, authController_1.default.registerUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
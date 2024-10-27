"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_js_1 = __importDefault(require("../controllers/contactController.js"));
const router = express_1.default.Router();
router.post("", contactController_js_1.default.receiveMessage);
router.post;
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map
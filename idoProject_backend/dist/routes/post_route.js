"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
router.post('/', post_1.default.newPost);
router.get('/', post_1.default.allPost);
router.delete('/', post_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=post_route.js.map
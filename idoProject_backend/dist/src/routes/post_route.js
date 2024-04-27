"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
router.post('/', post_1.default.post.bind(post_1.default));
router.get('/', post_1.default.allPost.bind(post_1.default));
router.delete('/:id', post_1.default.remove.bind(post_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map
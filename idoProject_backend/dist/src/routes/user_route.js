"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../controllers/user"));
const user_middleware_1 = __importDefault(require("../common/user_middleware"));
router.get("/", user_middleware_1.default, user_1.default.getUser.bind(user_1.default));
router.delete('/:id', user_middleware_1.default, user_1.default.remove.bind(user_1.default));
router.get("/:id", user_middleware_1.default, user_1.default.getById.bind(user_1.default));
router.post("/", user_middleware_1.default, user_1.default.post.bind(user_1.default));
router.put("/:id", user_middleware_1.default, user_1.default.put.bind(user_1.default));
router.delete("/:id", user_middleware_1.default, user_1.default.remove.bind(user_1.default));
router.post('/register', user_1.default.register.bind(user_1.default));
router.post('/login', user_1.default.login.bind(user_1.default));
router.post('/logout', user_1.default.login.bind(user_1.default));
router.get('/refresh', user_1.default.refresh.bind(user_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    sender: { _id: String, name: String, imgUrl: String },
});
exports.default = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=postModel.js.map
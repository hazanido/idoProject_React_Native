"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get");
            try {
                if (req.query.name) {
                    const filterQuery = { name: req.query.name };
                    const item = yield this.itemModel.find(filterQuery);
                    res.status(200).send(item);
                }
                else {
                    const item = yield this.itemModel.find();
                    res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.itemModel.findOne({ id: req.body.id });
                console.log(item);
                if (!item) {
                    return res.status(404).send("not found");
                }
                else {
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("item post ");
            try {
                const item = yield this.itemModel.create(req.body);
                res.status(201).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put");
            try {
                const item = yield this.itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!item) {
                    return res.status(404).send("not found");
                }
                else {
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" delete");
            try {
                yield this.itemModel.findByIdAndDelete(req.params.id);
                return res.status(200).send();
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map
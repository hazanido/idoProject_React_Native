import { Request, Response } from "express";
import mongoose from "mongoose";

class BaseController<ModelType> {
    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>) {
        this.itemModel = itemModel;
    }

    async getById(req: Request, res: Response) {
        console.log(req.params);
        try {
            const item = await this.itemModel.findById(req.params.id);
            console.log(item)
            if (!item) {
                return res.status(404).send("not found");
            } else {
                return res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async post(req: Request, res: Response) {
        console.log("item post ");
        try {
            const item = await this.itemModel.create(req.body);
            res.status(201).send(item);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    put(req: Request, res: Response) {
        console.log("student put");
        res.status(400).send("Not implemented");
    }

    async remove(req: Request, res: Response) {
        console.log("student delete");
        try {
            await this.itemModel.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export default BaseController;

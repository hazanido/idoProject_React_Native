import { Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";

class BaseController<ModelType> {
    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>) {
        this.itemModel = itemModel;
    }
    async get(req: Request, res: Response) {
        console.log("get");
        try {
            if (req.query.name) {
                const filterQuery = { name: req.query.name } as FilterQuery<ModelType>;
                const item = await this.itemModel.find(filterQuery);
                res.status(200).send(item);
            } else {
                const item = await this.itemModel.find();
                res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const item = await this.itemModel.findOne({id: req.body.id});
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

    async put(req: Request, res: Response) {
        console.log("put");
        try {
            const item = await this.itemModel.findByIdAndUpdate(req.params.id, req.body );
            // console.log("item: ", item);
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

    async remove(req: Request, res: Response) {
        console.log(" delete");
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

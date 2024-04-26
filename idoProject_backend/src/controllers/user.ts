import BaseController from './base';
import User,{IUser} from '../Model/userModel';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


class UserController extends BaseController<IUser>{
    constructor() {
        super(User)
    }

    async register (req: Request,res: Response){
        console.log("register");
        const email = req.body.email;
        const password = req.body.password;
        if (email == null || password == null) {
           return res.status(400).send("missing email or password")
        }
        try {
            const user = await User.findOne({email: email});
            if (user) {
                return  res.status(400).send("user already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = await User.create({
                name: req.body.name,
                Password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
            
            });
            return res.status(200).send(newUser);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message)
            
        }
    }
    async login (req: Request,res: Response){
        console.log("login");
        const email = req.body.email;
        const password = req.body.password;
        if (email == null || password == null) {
            return res.status(400).send("missing email or password")
         }
        try{
            const user = await User.findOne({email: email});
            if (user == null) {
                return  res.status(400).send("invalid emil or password");
            }
            const validePassword = await bcrypt.compare(password,user.Password);
            if(!validePassword){
                return res.status(400).send("invalid password");
            }
            const token = await jwt.sign({
                _id: user._id
            },process.env.TOKEN_SECRET,{
                expiresIn: process.env.TOKEN_EXPIRATION
            });
            

            return res.status(200).send({
                accessToken: token
            });

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
    
        }


}
}

export default new UserController();
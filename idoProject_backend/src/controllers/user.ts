import BaseController from './base';
import User,{IUser} from '../Model/userModel';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


class UserController extends BaseController<IUser>{
    constructor() {
        super(User)
    }
    async getUser (req: Request, res: Response){
        try {
            console.log("testtttttt");
            if (req.query.name) {
                
                const user = await User.findOne({ name: req.query.name } as Partial<IUser>);
                if (user) {
                    
                    console.log(user);
                    return res.status(200).json(user);
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            } else {
                console.log("if 14444");

                const users = await User.find();
                return res.status(200).json(users);
            }
        } catch (error) {
            console.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
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
                password: hashedPassword,
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

        console.log(req.body.email);
        if (email == null || password == null) {
            return res.status(400).send("missing email or password")
         }
        try{
            const user = await User.findOne({email: email});
            if (user == null) {
                return  res.status(400).send("invalid emil or password");
            }
            const validePassword = await bcrypt.compare(password,user.password);
            if(!validePassword){
                return res.status(400).send("invalid password");
            }
            const token =  jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });
            console.log("REFRESH_TOKEN_SECRET");
            const refreshtoken = jwt.sign({
                _id: user._id
            },process.env.REFRESH_TOKEN_SECRET);

            if(user.tokens == null){
               user.tokens = [refreshtoken];
            }else{
                user.tokens.push(refreshtoken);
            }await user.save();
                
            return res.status(200).send({
                accessToken: token,
                refreshToken: refreshtoken

            });

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
    
        }
    }

   
    async refresh (req: Request, res: Response){
        console.log("refresh");
        const userHeader = req.headers['authorization'];
        const refreshToken = userHeader && userHeader.split(' ')[1];

        if (refreshToken == null) {
            return res.status(401).send("missing token");
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userId:{_id: string} ) => {
            if (err) {
                return res.status(403).send("invalid token11111");
            }   
            try{
            const user = await User.findById(userId._id);
            console.log("userrrrrrrr:",user);
            if ( user == null || user.tokens == null || !user.tokens.includes(refreshToken)){
                if (user.tokens != null){
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token22222");
            }
            const token =  jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });
            console.log("REFRESH_TOKEN_SECRET");
            const newRefreshtoken = jwt.sign({
                _id: user._id
            },process.env.REFRESH_TOKEN_SECRET);

            user.tokens = user.tokens.filter(token => token != refreshToken);
            user.tokens.push(newRefreshtoken);
            await user.save();
                
            return res.status(200).send({
                accessToken: token,
                refreshToken: newRefreshtoken

            });
        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);

        }
        });

    }


    // async refresh1 (req: Request, res: Response){
    //     const userHeader = req.headers['authorization'];
    //     const refreshToken = userHeader && userHeader.split('')[1];

    //     if (refreshToken == null) {
    //         return res.status(401).send("missing token");
    //     }
    //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,async (err, userInfo: {_id: string}) => {
    //         if (err) {
    //             return res.status(403).send("invalid token");
    //         }
    //         const user = await User.findById(userInfo._id);



            
    //     });

    // }
}

export default new UserController();
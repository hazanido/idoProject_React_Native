import BaseController from './base';
import User,{IUser} from '../Model/userModel';
import Post from '../Model/postModel';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


class UserController extends BaseController<IUser>{
    constructor() {
        super(User)
    }
    async getUserByToken (req: Request, res: Response){
        try {
            console.log("getUserByToken");
            console.log("Getting user by token:", req.params.tokens);
            const token = req.params.tokens;
            console.log("token:",token);
            const user = await User.findOne({ tokens: token });
            console.log("user:",user);  
            if (!user) {
              return res.status(404).send("token user not found");
            } else {
              return res.status(200).send(user);
            }
          } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
          }
        }
        async getPostByUserId (req: Request, res: Response){
            console.log("getPostByUser");
            try {
                const token = req.params.tokens;
                if (!token) {
                    return res.status(400).send("Token is required");
                }
        
                const user = await User.findOne({ tokens: token });
                if (!user) {
                    return res.status(404).send("Token user not found");
                } else {
                    const posts = await Post.find({ 'sender._id': user._id });
                    console.log("posts:", posts);
                    return res.status(200).json(posts);
                }
            } catch (error) {
                console.error(error);
                return res.status(500).send(error.message);
            }
        }
    async getUser (req: Request, res: Response){
        try {
            if (req.query.name) {
                
                const user = await User.findOne({ name: req.query.name } as Partial<IUser>);
                if (user) {
                    
                    console.log(user);
                    return res.status(200).json(user);
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            } else {
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
                console.log("user already exists");
                return res.status(409).json({ message: 'Email already in use' });

            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = new User({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
                imgUrl: 'idoProject_backend/imageUser/defultImag.jpg'
            
            });
            await newUser.save();
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
                _id: user._id,
                salt: Math.random()
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
                _id: user._id,
                salt: Math.random()
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
    async logout(req: Request, res: Response) {
        console.log("logout");
    
        const userHeader = req.headers['authorization'];
        const refreshToken = userHeader && userHeader.split(' ')[1];
    
        if (refreshToken == null) {
            return res.status(401).send("missing token");
        }
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userId: { _id: string }) => {
            if (err) {
                console.log(err);
                return res.status(403).send("Invalid token");
            }
    
            try {
                const user = await User.findById(userId._id);
                if (!user) {
                    return res.status(404).send("User not found");
                }
    
                if (!user.tokens || !user.tokens.includes(refreshToken)) {
                    return res.status(403).send("invalid token");
                }
    
                user.tokens = user.tokens.filter(token => token != refreshToken);
                await user.save();
    
                return res.status(200).send("logout successfully");
            } catch (error) {
                console.log(error);
                return res.status(500).send("Internal server error");
            }
        });
    }
    async updateByToken(req: Request, res: Response) {
        console.log("updateByToken");
        const token = req.params.tokens;
        console.log("token:",token);
        if (!token) {

            return res.status(400).send("Token is required");
        }
        try {

            const user = await User.findOne({ tokens: token });
            if (!user) {

                return res.status(404).send("Token user not found");
            }
            console.log('testtttt:::', req.body);
            const updates = Object.keys(req.body);
            const allowedUpdates = ['name', 'password', 'email', 'age', 'imgUrl'];
            const isValidOperation = updates.every(update => allowedUpdates.includes(update));
            if (!isValidOperation) {
                return res.status(400).send("Invalid updates");
            }
            updates.forEach(update => user[update] = req.body[update]);
            

            await user.save();
            return res.status(200).send(user);
        } catch (error) {
            console.error(error);
            return res.status(500).send(error.message);
        }
    }
    async google(req: Request, res: Response) {
        try {
          const { email, name, imgUrl } = req.body;
          let user = await User.findOne({ email });
          if (!user) {
            user = new User({ email, name, imgUrl, password: '' });
            await user.save();
          }
          
          const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
          const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
          
          res.status(200).send({ accessToken, refreshToken });
        } catch (error) {
          res.status(500).send({ message: 'Internal server error' });
        }
      }

}

export default new UserController();
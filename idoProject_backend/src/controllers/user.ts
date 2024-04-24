//import User from '../Model/userModel';
import { Request, Response } from 'express';

const newUser = (req:Request,res:Response)=>{
    res.send('new user');

}

export default {newUser};
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import user from './Model/userModel';
import user_route from './routes/user_route.js';
import post_route from './routes/post_route.js';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const appInit = () =>{
   const promise = new Promise(async (resolve) => {
    
        try {
            console.log('Trying to connect to DB');
            await mongoose.connect(process.env.DB_CONNECT);
            console.log('Connected to MongoDB.');
        } catch (error) {
            console.log('Error connecting to DB: ' + error);
        }
    
    app.use('/user',user_route);
    app.use('/post',post_route);
    
    app.get('/', (req, res) => {
        res.send('SERVER STARTED!');
    });

    resolve(app);
   });
   return promise;
};




export default appInit;

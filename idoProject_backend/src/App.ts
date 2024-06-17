import express, {Express} from 'express';
import path from 'path'; 
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import user_route from './routes/user_route';
import post_route from './routes/post_route';
import fileRoute from './routes/file_route';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const appInit = () =>{
   const promise = new Promise<Express>((resolve) => {
    
        try {
            console.log('Trying to connect to DB');
            mongoose.connect(process.env.DB_CONNECT);
            console.log('Connected to MongoDB.');
        } catch (error) {
            console.log('Error connecting to DB: ' + error);
        }
    app.use('/idoProject_backend/imageUser', express.static(path.join(__dirname, '../imageUser')));
    app.use('/user',user_route);
    app.use('/post',post_route);
    app.use('/imageUser', express.static(path.join(__dirname, '../imageUser')));
    app.use("/files",fileRoute);
    
    app.get('/', (req, res) => {
        res.send('SERVER STARTED!');
    });

    resolve(app);
   });
   return promise;
};

export default appInit;

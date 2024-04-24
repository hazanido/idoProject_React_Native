const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./Model/userModel');
const user_route = require('./routes/user_route.js');
const post_route = require('./routes/post_route.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const appInit = () =>{
   const promise = new Promise((resolve) => {
    
        try {
            console.log('Trying to connect to DB');
            mongoose.connect(process.env.DB_CONNECT);
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




module.exports = appInit;

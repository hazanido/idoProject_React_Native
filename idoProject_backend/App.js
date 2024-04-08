const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./Model/userModel');
const user_route = require('./routes/user_route.js');
const post_route = require('./routes/post_route.js');



async function connecttoDB() {
    try {
        console.log('Trying to connect to DB');
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log('Error connecting to DB: ' + error);
    }
}
connecttoDB();
app.use('/user',user_route);
app.use('/post',post_route);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('SERVER STARTED!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

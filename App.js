const express = require("express")
const app = express();
const dotenv = require("dotenv").config();

app.get('/', (req, res) => {
    res.send('SERVER STARTED!')
})

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})
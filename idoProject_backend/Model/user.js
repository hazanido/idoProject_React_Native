const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    email:{ 
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        required: true,
        }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


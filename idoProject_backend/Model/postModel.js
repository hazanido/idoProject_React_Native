const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    message:{
        type: String,
        require: true
    },
    sender:{
        type: String,
        require: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
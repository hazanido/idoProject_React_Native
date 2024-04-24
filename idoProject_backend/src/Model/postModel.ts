import mongoose from 'mongoose';

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



export default mongoose.model('Post', postSchema);
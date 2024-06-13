import mongoose from 'mongoose';

export interface IPost {
    _id: string;
    title: string;
    message: string;
    sender: {_id: string, name: string, imgUrl: string};
}

const postSchema = new mongoose.Schema<IPost>({
    _id: {
        type: String,
        required: true,
    },

    title:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    },
    sender:{_id: String, name: String, imgUrl: String},
    
});



export default mongoose.model<IPost>("Post", postSchema);
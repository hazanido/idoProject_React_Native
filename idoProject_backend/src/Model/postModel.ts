import mongoose from 'mongoose';

export interface IPost {
    message: string;
    sender: string;
}

const postSchema = new mongoose.Schema<IPost>({
    message:{
        type: String,
        require: true
    },
    sender:{
        type: String,
        require: true
    }
});



export default mongoose.model<IPost>("Post", postSchema);
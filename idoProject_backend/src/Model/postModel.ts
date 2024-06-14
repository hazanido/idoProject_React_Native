import mongoose from 'mongoose';

export interface IPost {
    
    title: string;
    message: string;
    sender: {_id: string, name: string, imgUrl: string};
}

const postSchema = new mongoose.Schema<IPost>({

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
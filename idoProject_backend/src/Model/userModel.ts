import mongoose from 'mongoose';

export interface IUser {
    name: string;
    password: string;
    email: string;
    age: number;
    imgUrl: string;
    tokens: string[];
    
    
}

const UserSchema = new mongoose.Schema<IUser>({
    
    name: {
        type: String,
        required: true,
      },
    password:{
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
        },
    imgUrl: {
        type: String,
        },    
    tokens: {
        type: [String]
    }    
    
  
});

export default mongoose.model<IUser>("User", UserSchema);


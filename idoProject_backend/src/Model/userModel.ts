import mongoose from 'mongoose';

export interface IUser {
    name: string;
    Password: string;
    email: string;
    age: number;
    
    
    
}

const UserSchema = new mongoose.Schema<IUser>({
    
    name: {
        type: String,
        required: true,
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
        },
    
  
});

export default mongoose.model<IUser>("User", UserSchema);


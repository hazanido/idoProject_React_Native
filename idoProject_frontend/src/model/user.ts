import postAPI from "../../api/postAPI";
import userAPI from "../../api/userAPI";
import { Post } from "./post";

export type User = {
    _id: any
    name: string
    password: string
    email: string
    age: Number
    imgUrl: string
};

export const userModel = {

  getAllUsers: async (token: string): Promise<User[]> => {
    try {
      const response = await userAPI.getAllUser(token);
      return response.data as User[];
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  getUser: async (id: string): Promise<User> => {
    try {
      const response = await userAPI.getUser(id);
      return response.data as User;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },
  getUserByToken: async (token: string): Promise<User> => {
    try {
      console.log('Getting user by token:', token);
      const response:any = await userAPI.getUserByToken(token);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  createUser: async (user: User): Promise<User> => {
    try {
      const response = await userAPI.registerUser(user);
      return response.data as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  loginUser: async (user: User): Promise<{ accessToken: string, refreshToken: string }> => {
    try {
      console.log('Logging in with email:', user.email, 'and password', user.password);
      const response = await userAPI.loginUser(user);
      return response.data as { accessToken: string, refreshToken: string };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  },

  updateUser: async (token: string,user: Partial<User>): Promise<User> => {
    try {
      console.log('Updating user:', user);
      const response = await userAPI.updateUser(token,user);
      return response.data as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
  getPostByUserId: async (token: string): Promise<Post[]> => {
    try {
      const response = await userAPI.getPostByUserId(token);
      return response.data as Post[];
    } catch (error) {
      console.error('Error getting posts by user ID:', error);
      throw error;
    }
  },
  checkEmailExists: async (email: string,token: string): Promise<boolean> => {
    try {
      const users = await userModel.getAllUsers(token);
      console.log('Checking if users:', users);
      return users.some(user => user.email === email);
    } catch (error) {
      console.error('Error checking if email exists:', error);
      throw error;
    }
  },
};

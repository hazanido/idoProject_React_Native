import userAPI from "../../api/userAPI";

export type User = {
    _id: any
    name: string
    password: string
    email: string
    age: Number
    imgUrl: string
};

export const userModel = {

  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await userAPI.getAllUser();
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
      console.log('1234:',response.data);
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

  updateUser: async (user: User): Promise<User> => {
    try {
      const response = await userAPI.updateUser(user);
      return response.data as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

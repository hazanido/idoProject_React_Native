import userAPI from "../../api/userAPI";

export type User = {
    [x: string]: any;
    id: any
    name: string,
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
  },

  updateProfileImage: async (userId: string, image: FormData): Promise<User> => {
    try {
      const response = await userAPI.updateProfileImage(userId, image);
      return response.data as User;
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw error;
    }
  }
};


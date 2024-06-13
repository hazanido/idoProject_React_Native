import backAPI from "../../api/backAPI"
import userAPI from "../../api/userAPI"


export type User = {
    id: any
    name: string,
    password: string
    email: string
    age: Number
    imgUrl: string
}

export const userModel = {

    getAllUsers: async (): Promise<User[]> => {
        try {
          const response = await userAPI.getAllUser();
          return response.data as User[]; // Assuming the response contains the list of users
        } catch (error) {
          console.error('Error getting all users:', error);
          throw error; // Handle the error as needed
        }
      },
      


getUser: async (id: string): Promise<User> => {
    try {
      const response = await userAPI.getUser(id);
      return response.data as User; // Assuming the response contains the user data
    } catch (error) {
      console.error('Error getting user:', error);
      throw error; // Handle the error as needed
    }
  },
  

createUser: async (user: User): Promise<User> => {
    try {
      const response = await userAPI.registerUser(user);
      return response.data as User; // Assuming the response contains the newly created user data
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Handle the error as needed
    }
  },
  


loginUser : async (credentials: any) => {
    console.log('try to login');
    const response = await backAPI.post('/user/login', credentials);
    console.log('Server response:', response);
    if (response.ok) {
      return response.data;
    } else {
      console.error('Login request failed:', response.problem);
      return null;
    }
  },
  

  updateUser: async (user: User): Promise<User> => {
    try {
      const response = await userAPI.updateUser(user);
      return response.data as User; // Assuming the response contains the updated user data
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; // Handle the error as needed
    }
  },
  

}
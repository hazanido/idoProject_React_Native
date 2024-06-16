// userAPI.ts
import { User } from "../src/model/user";
import backAPI from "./backAPI";

const userAPI = {
    getAllUser: async () => {
      return backAPI.get('/user');
    },
  
    getUser: async (id: string) => {
      return backAPI.get(`/user/${id}`);
    },
  
    updateUser: async (user: User) => {
      return backAPI.put(`/user/${user.id}`, user);
    },
  
    deleteUser: async (id: string) => {
      return backAPI.delete(`/user/${id}`);
    },
  
    loginUser: async (user: User) => {
      return backAPI.post('/user/login', user);
    },
  
    registerUser: async (user: User) => {
      return backAPI.post('/user/register', user);
    },
  
    logoutUser: async (token: string) => {
      return backAPI.post('/user/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
  
    updateProfileImage: async (userId: string, image: FormData) => {
      return backAPI.put(`/user/${userId}/profile-image`, image, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
  
    googleUser: async (user: User) => {
      return backAPI.post('/user/google', user);
    },
  
    getCurrentUser: async (token: string) => {
      return backAPI.get('/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  };
  
  export default userAPI;
  
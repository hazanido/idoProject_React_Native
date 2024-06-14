import { User } from "../src/model/user";
import backAPI from "./backAPI";

const userAPI = {
    getAllUser: async () => {
        return backAPI.get('/user')
    },

    getUser: async (id: string) => {
        return backAPI.get(`/user/${id}`)
    },

    updateUser: async (user: User) => {
        return backAPI.put(`/user/${user.id}`, user)
    },

    deleteUser: async (id: string) => {
        return backAPI.delete(`/user/${id}`)
    },

    loginUser: async (user: User) => {
        console.log("try to login")
        return backAPI.post('/user/login', user)
        
    },

    registerUser: async (user: User) => {
        try {
            const response = await backAPI.post('/user/register', user);
            return response;
          } catch (error: any) {
            throw error.response || error;
          }
    },

    logoutUser: async (refreshToken: string) => {
        return backAPI.post('/user/logout', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
    },

    googleUser: async (user: User) => {
        return backAPI.post('/user/google', user)
    },
};

export default userAPI;

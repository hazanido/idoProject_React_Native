import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { User } from "../src/model/user";
import backAPI from "./backAPI";

const userAPI = {
    getAllUser: async () => {
        return backAPI.get('/user')
    },

    getUser: async (_id: string) => {
        return backAPI.get(`/user/${_id}`)
    },
    getUserByToken: async (token: string) => {
        return backAPI.get(`/user/${token}`)
        
    },
    getPostByUserId: async ( token: string) => {
        return backAPI.get(`/user/post/${token}` )
    },
    updateUser: async (user: User) => {
        return backAPI.put(`/user/${user._id}`, user)
    },

    deleteUser: async (_id: string) => {
        return backAPI.delete(`/user/${_id}`)
    },

    loginUser: async (user: User) => {
        console.log("try to login")
        return backAPI.post('/user/login', user)
        
    },

    registerUser: async (user: User) => {
        return backAPI.post('/user/register', user)
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

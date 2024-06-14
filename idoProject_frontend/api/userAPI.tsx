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
        return backAPI.post('/user/register', user)
    },

    logoutUser: async (token: string) => {
        console.log("try to logout")
        return backAPI.post('/user/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    googleUser: async (user: User) => {
        return backAPI.post('/user/google', user)
    },
};

export default userAPI;

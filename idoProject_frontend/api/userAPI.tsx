<<<<<<< HEAD
// userAPI.ts
=======
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
>>>>>>> my-branc678
import { User } from "../src/model/user";
import backAPI from "./backAPI";

const userAPI = {
<<<<<<< HEAD
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
=======
    getAllUser: async (token: string) => {
        return backAPI.get('/post', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

        
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
    updateUser: async (token: string,user: Partial<User>) => {
        return backAPI.put(`/user/put/${token}`, user)
    },

    deleteUser: async (_id: string) => {
        return backAPI.delete(`/user/${_id}`)
    },
>>>>>>> my-branc678

  loginUser: async (user: User) => {
    console.log("try to login");
    return backAPI.post('/user/login', user);
  },

  registerUser: async (user: User) => {
    return backAPI.post('/user/register', user);
  },

  logoutUser: async (token: string) => {
    console.log("try to logout");
    return backAPI.post('/user/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

<<<<<<< HEAD
  googleUser: async (user: User) => {
    return backAPI.post('/user/google', user);
  },

  getCurrentUser: async (token: string) => {
    return backAPI.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
=======
    googleUser: async (user: User) => {
        return backAPI.post('/user/google', user)
    },
    
>>>>>>> my-branc678
};

export default userAPI;

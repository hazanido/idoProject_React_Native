import { Post } from "../src/model/post";
import backAPI from "./backAPI";

const postAPI = {
  getAllPost: async (token: string) => {
    return backAPI.get('/post', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  getPost: async (id: string, token: string) => {
    return backAPI.get(`/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  createPost: async (post: Post, token: string) => {
    return backAPI.post('/post', post, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  updatePost: async (post: Post, token: string) => {
    return backAPI.put(`/post/${post.id}`, post, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  deletePost: async (id: string, token: string) => {
    return backAPI.delete(`/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

export default postAPI;

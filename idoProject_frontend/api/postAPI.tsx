import backAPI from "./backAPI";
import { Post } from "../src/model/post";

const postAPI = {
    getAllPost: async () => {
        return backAPI.get('/post')
    },

    getPost: async (id: string) => {
        return backAPI.get(`/post/${id}`)
    },

    createPost: async (post: Post) => {
        return backAPI.post('/post', post)
    },

    updatePost: async (post: Post) => {
        return backAPI.put(`/post/${post.id}`, post)
    },

    deletePost: async (id: string) => {
        return backAPI.delete(`/post/${id}`)
    },
};

export default postAPI;
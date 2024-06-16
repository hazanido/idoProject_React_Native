import postAPI from "../../api/postAPI";
import { User } from './user';

export type Post = {
    id: string;
    title: string;
    message: string;
    sender: {_id: string, name: string, imgUrl: string};
}

export const postModel = {

    getAllPosts: async (token: string): Promise<Post[]> => {
        try {
          const response = await postAPI.getAllPost(token);
          return response.data as Post[]; 
        } catch (error) {
          console.error('Error getting all posts:', error);
          throw error; 
        }
      },

    getPost: async (_id: string, token: string): Promise<Post> => {
        try {
          const response = await postAPI.getPost(_id, token);
          return response.data as Post; 
        } catch (error) {
          console.error('Error getting post:', error);
          throw error; 
        }
      },

    createPost: async (post: Post, token: string): Promise<Post> => {
        try {
          const response = await postAPI.createPost(post, token);
          return response.data as Post; 
        } catch (error) {
          console.error('Error creating post:', error);
          throw error; 
        }
      },

    updatePost: async (post: Post, token: string): Promise<Post> => {
        try {
          const response = await postAPI.updatePost(post, token);
          return response.data as Post; 
        } catch (error) {
          console.error('Error updating post:', error);
          throw error; 
        }
      },

    deletePost: async (id: string, token: string): Promise<void> => {
        try {
          await postAPI.deletePost(id, token);
        } catch (error) {
          console.error('Error deleting post:', error);
          throw error; 
        }
      }
}

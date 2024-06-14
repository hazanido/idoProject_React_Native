import  postAPI  from "../../api/postAPI"
import { User } from './user';

export type Post = {
    id: any
    title: string,
    message: string
    sender: User
}

export const postModel = {

    getAllPosts: async (): Promise<Post[]> => {
        try {
          const response = await postAPI.getAllPost();
          return response.data as Post[]; // Assuming the response contains the list of posts
        } catch (error) {
          console.error('Error getting all posts:', error);
          throw error; // Handle the error as needed
        }
      },
      

    getPost: async (id: string): Promise<Post> => {
        try {
          const response = await postAPI.getPost(id);
          return response.data as Post; // Assuming the response contains the post data
        } catch (error) {
          console.error('Error getting post:', error);
          throw error; // Handle the error as needed
        }
      },
      

    createPost: async (post: Post): Promise<Post> => {
        try {
          const response = await postAPI.createPost(post);
          return response.data as Post; // Assuming the response contains the newly created post data
        } catch (error) {
          console.error('Error creating post:', error);
          throw error; // Handle the error as needed
        }
      },
      

    updatePost: async (post: Post): Promise<Post> => {
        try {
          const response = await postAPI.updatePost(post);
          return response.data as Post; // Assuming the response contains the updated post data
        } catch (error) {
          console.error('Error updating post:', error);
          throw error; // Handle the error as needed
        }
      },
      

    deletePost: async (id: string): Promise<void> => {
        try {
          await postAPI.deletePost(id);
        } catch (error) {
          console.error('Error deleting post:', error);
          throw error; // Handle the error as needed
        }
      }
}
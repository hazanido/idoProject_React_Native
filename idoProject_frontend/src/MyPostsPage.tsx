import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Post, postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { back_URL } from '../config';
import { User, userModel } from './model/user';

const MyPostsPage: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const processPosts = (posts: any[]): Post[] => {
    return posts.map(post => ({
      id: post._id,
      title: post.title,
      message: post.message,
      sender: post.sender,
    }));
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('refreshToken');
        const userString = await userModel.getUserByToken(token as string);
        const user: User = userString as User;

        if (!token || !user) {
          navigation.navigate('MainPageLogin');
          return;
        }

        const response = await userModel.getPostByUserId(token);
        const processedPosts = processPosts(response);
        console.log('Fetched posts:', response);
        setPosts(processedPosts);
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
        navigation.navigate('MainPageLogin'); 
      }
    };

    fetchMyPosts();
  }, []);

  useEffect(() => {
    if (route.params?.updatedPost) {
      const updatedPost = route.params.updatedPost;
      setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    }
  }, [route.params?.updatedPost]);

  const handleDeletePost = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      console.log('Deleting post with ID:', postId);
      await postModel.deletePost(postId, token as string);
      setPosts(posts.filter(post => post.id !== postId));
      Alert.alert('Success', 'Post deleted successfully');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post. Please try again later.');
    }
  };

  const handleEditPost = (post: Post) => {
    navigation.navigate('EditPostPage', { post });
  };

  const handlePostPress = (post: Post) => {
    console.log('Post pressed:', post.id);
    Alert.alert(
      'Post Options',
      'Choose an action',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeletePost(post.id),
          style: 'destructive',
        },
        {
          text: 'Edit',
          onPress: () => handleEditPost(post),
        },
      ],
      { cancelable: true }
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item)}>
      <Image source={{ uri: `${back_URL}${item.sender.imgUrl}` }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  postContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyPostsPage;

import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Post, postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../api/userAPI';
import { back_URL } from '../config';

const FeedPage: FC<{navigation: any}> = ({navigation}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log('posts:', posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('Fetched token:', token);
        if (!token) {
          console.log('No token found, navigating to MainPageLogin');
          navigation.navigate('MainPageLogin');
          return;
        }
        
        const response = await postModel.getAllPosts(token);
        console.log('Fetched posts:', response);
        setPosts(response);
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
        navigation.navigate('MainPageLogin'); 
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      console.log('Refresh token for logout:', refreshToken);
      if (refreshToken) {
        await userAPI.logoutUser(refreshToken);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        console.log('Logged out successfully, navigating to MainPageLogin');
        navigation.navigate('MainPageLogin');
      }
    } catch (error: any) {
      console.error('Error logging out:', error);
      Alert.alert('Error', error.message);
      
    }
  };
  

  const handleProfile = () => {
    navigation.navigate('ProfilePage');
  };

  const handleAddPost = () => {
    navigation.navigate('AddPostPage');
  };

  const handlePostPress = (post: { sender: { name: string; }; message: string; }) => {
    Alert.alert('Post by ' + post.sender.name, 'Post content: ' + post.message);
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
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout}>
          <Image source={require('../assets/log-out.png')} style={styles.footerButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfile}>
          <Image source={require('../assets/user.png')} style={styles.footerButtonImage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddPost}>
        <Image source={require('../assets/plus.png')} style={styles.floatingButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerButtonImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
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
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  floatingButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default FeedPage;

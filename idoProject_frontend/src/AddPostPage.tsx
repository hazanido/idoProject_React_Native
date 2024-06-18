import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, userModel } from './model/user';


const AddPostPage: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleCreatePost = async () => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      if (!token) {
        console.log('No token found, navigating to MainPageLogin');
        navigation.navigate('MainPageLogin');
        return;
      }

      const userString = await userModel.getUserByToken(token);
      if (!userString) {
        throw new Error('User not found');
      }

      const user: User = userString as User;

      const newPost = {
        id: '',
        title,
        message,
        sender: {
            _id: user._id,
            name: user.name,
            imgUrl: user.imgUrl,
        },
      };

      const createdPost = await postModel.createPost(newPost, token);
      Alert.alert('Success', 'Post created successfully!');
      navigation.navigate('FeedPage', { newPost: createdPost }); 
    } catch (error: any) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>כותרת:</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס כותרת"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>תוכן:</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס תוכן הפוסט"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
        <Image source={require('../assets/createPost.png')} style={styles.createButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  createButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  createButtonImage: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
  },
});

export default AddPostPage;

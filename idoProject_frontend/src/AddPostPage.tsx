<<<<<<< HEAD
import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../api/userAPI';
import { User } from './model/user';

const AddPostPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        try {
          const userResponse = await userAPI.getCurrentUser(token);
          setCurrentUser(userResponse.data as User);
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleAddPost = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'You must be logged in to add a post.');
        return;
      }

      if (!currentUser) {
        Alert.alert('Error', 'Failed to fetch user data.');
        return;
      }

      const response = await postModel.createPost({
        id: '', // Add default id
        title: title,
        message: message,
        sender: currentUser
      }, token);

      Alert.alert('Success', 'Post added successfully.');
      navigation.navigate('FeedPage', { refresh: true }); // Added refresh parameter
    } catch (error: any) {
      console.error('Error adding post:', error);
      Alert.alert('Error', error.message || 'Failed to add post. Please try again.');
=======
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
>>>>>>> my-branc678
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>הוספת פוסט</Text>
=======
      <Text style={styles.label}>כותרת:</Text>
>>>>>>> my-branc678
      <TextInput
        style={styles.input}
        placeholder="הכנס כותרת"
        value={title}
        onChangeText={setTitle}
      />
<<<<<<< HEAD
      <TextInput
        style={styles.input}
        placeholder="הכנס תוכן"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Image source={require('../assets/addPost.png')} style={styles.buttonImage} />
=======
      <Text style={styles.label}>תוכן:</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס תוכן הפוסט"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
        <Image source={require('../assets/createPost.png')} style={styles.createButtonImage} />
>>>>>>> my-branc678
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  button: {
    marginVertical: 20,
  },
  buttonImage: {
    width: 310,
    height: 90,
=======
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
>>>>>>> my-branc678
    resizeMode: 'contain',
  },
});

export default AddPostPage;

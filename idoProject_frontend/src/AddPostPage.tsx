import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
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
          if (userResponse.status === 200) {
            setCurrentUser(userResponse.data as User);
          } else {
            Alert.alert('Error', 'Failed to fetch user data.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      onPostAdded: handleAddPost,
    });
  }, [navigation, title, message, currentUser]);

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

      const newPost = {
        title,
        message,
        sender: currentUser._id,
      };

      const response = await postModel.createPost(newPost, token);

      Alert.alert('Success', 'Post added successfully.');
      navigation.navigate('FeedPage', { refresh: true });
    } catch (error: any) {
      console.error('Error adding post:', error);
      Alert.alert('Error', error.message || 'Failed to add post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הוספת פוסט</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס כותרת"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="הכנס תוכן"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Image source={require('../assets/addPost.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    resizeMode: 'contain',
  },
});

export default AddPostPage;

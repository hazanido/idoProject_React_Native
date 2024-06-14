import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPostPage: FC<{navigation: any}> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleAddPost = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'You must be logged in to add a post.');
        return;
      }

      const response = await postModel.createPost({
          title: title,
          message: message,
          sender: { } 
          ,
          id: undefined
      }, token);

      Alert.alert('Success', 'Post added successfully.');
      navigation.navigate('FeedPage');
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

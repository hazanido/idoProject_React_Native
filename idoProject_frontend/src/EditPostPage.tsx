import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { postModel } from './model/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from './model/post';

const EditPostPage: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const post: Post = route.params.post;

  useEffect(() => {
    setTitle(post.title);
    setMessage(post.message);
  }, [post]);

  const handleUpdatePost = async () => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      if (!token) {
        navigation.navigate('MainPageLogin');
        return;
      }

      const updatedPost: Post = {
        ...post,
        title,
        message,
      };

      await postModel.updatePost(updatedPost, token);
      Alert.alert('Success', 'Post updated successfully!');
      navigation.navigate('MyPostsPage', { updatedPost });
    } catch (error: any) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'Failed to update post. Please try again later.');
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
      <TouchableOpacity style={styles.createButton} onPress={handleUpdatePost}>
        <Image source={require('../assets/updatePost.png')} style={styles.createButtonImage} />
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
    width: '100%',
    height: 60, 
  },
  createButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default EditPostPage;

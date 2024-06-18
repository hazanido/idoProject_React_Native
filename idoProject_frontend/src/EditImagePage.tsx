import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";import { userModel } from './model/user';
import { back_URL } from '../config';
import { requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditImagePage: FC<{ navigation: any }> = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const cameraPermission = await requestCameraPermissionsAsync();
      const libraryPermission = await requestMediaLibraryPermissionsAsync();

      if (!cameraPermission.granted || !libraryPermission.granted) {
        Alert.alert('You need to enable permissions to access the camera and library.');
      }
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const formData: any = new FormData();
      formData.append('file', {
        uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch(`${back_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const token = await AsyncStorage.getItem('refreshToken');
        if (!token) {
          navigation.navigate('MainPageLogin');
          return;
        }

        await userModel.updateUser(token, { imgUrl: data.url });
        Alert.alert('Success', 'Image uploaded successfully!');
        navigation.navigate('ProfilePage');
      } else {
        Alert.alert('Error', 'Failed to upload image. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again later.');
    }
  };

  const handleCameraLaunch = async () => {
    const { granted } = await requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert('You need to enable permission to access the camera.');
      return;
    }

    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const uri = asset.uri ?? '';
        if (uri) {
          setImage(uri);
          uploadImage(uri);
        } else {
          Alert.alert('Error', 'Failed to get image URI. Please try again.');
        }
      } else {
        Alert.alert('Error', 'No image captured. Please try again.');
      }
    });
  };

  const handleImageLibraryLaunch = async () => {
    const { granted } = await requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('You need to enable permission to access the library.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const uri = asset.uri ?? '';
        if (uri) {
          setImage(uri);
          uploadImage(uri);
        } else {
          Alert.alert('Error', 'Failed to get image URI. Please try again.');
        }
      } else {
        Alert.alert('Error', 'No image selected. Please try again.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Profile Image</Text>
      <TouchableOpacity onPress={handleCameraLaunch}>
        <Image source={require('../assets/camera.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImageLibraryLaunch}>
        <Image source={require('../assets/gallery.png')} style={styles.icon} />
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default EditImagePage;

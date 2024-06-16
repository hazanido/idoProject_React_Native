import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, userModel } from './model/user';
import { back_URL } from '../config';

const ProfilePage: FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('refreshToken');
        if (!token) {
          navigation.navigate('MainPageLogin');
          return;
        }

        const userString = await userModel.getUserByToken(token);
        if (!userString) {
          throw new Error('User not found');
        }

        const fetchedUser: User = userString as User;
        setUser(fetchedUser);
      } catch (error: any) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to fetch user. Please try again later.');
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('EditImagePage')}>
        <Image source={{ uri: `${back_URL}${user.imgUrl}` }} style={styles.userImage} />
      </TouchableOpacity>
      <Text style={styles.label}>שם:</Text>
      <Text style={styles.userInfo}>{user.name}</Text>
      <Text style={styles.label}>אימייל:</Text>
      <Text style={styles.userInfo}>{user.email}</Text>
      <Text style={styles.label}>גיל:</Text>
      <Text style={styles.userInfo}>{user.age.toString()}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfilePage')}>
          <Image source={require('../assets/editProfile.png')} style={styles.iconButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPostsPage')}>
          <Image source={require('../assets/myPost.png')} style={styles.iconButtonImage} />
        </TouchableOpacity>
      </View>
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
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'column', // שינוי הכיוון לאחד מתחת לשני
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  iconButtonImage: {
    width: 300,  
    height: 70,  
    marginVertical: 10,
    resizeMode: 'contain',
  },
});

export default ProfilePage;

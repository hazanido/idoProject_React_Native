import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { userModel } from './model/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './model/user';

const EditProfilePage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

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

        const user: User = userString as User;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age.toString());
      } catch (error: any) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to fetch user. Please try again later.');
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('refreshToken');
      if (!token) {
        navigation.navigate('MainPageLogin');
        return;
      }

      const updatedUser: Partial<User> = {
        name,
        email,
        age: parseInt(age, 10),
      };

      const emailExists = await userModel.checkEmailExists(email,token);
      if (emailExists) {
        Alert.alert('Error', 'Email is already taken. Please use a different email.');
        return;
      }
      console.log('user is:',updatedUser);
      await userModel.updateUser(token,updatedUser);
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('ProfilePage');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Image source={require('../assets/updateProfile.png')} style={styles.updateButtonImage} />
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
  updateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
    height: 60, 
  },
  updateButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default EditProfilePage;

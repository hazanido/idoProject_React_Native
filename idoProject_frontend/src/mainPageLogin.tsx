import { StatusBar } from 'expo-status-bar';
import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { userModel } from './model/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPageLogin: FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Logging in with email:', email, 'and password:', password);
      const response = await userModel.loginUser({
        id: '', 
        name: '', 
        age: 0, 
        imgUrl: '', 
        email,
        password,
      });
      console.log('Server response:', response);
      const { accessToken, refreshToken } = response;
      if (accessToken && refreshToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        console.log('Logged in successfully');

        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        console.log('Stored accessToken:', storedAccessToken);
        console.log('Stored refreshToken:', storedRefreshToken);

        navigation.navigate('FeedPage');
      } else {
        console.error('No token found in response');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegistrationPage');
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>לוח יד 2</Text>
      <Text style={styles.subtitle}>כדי להמשיך לאפליקציה, יש להירשם או להתחבר</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="הכנס סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Image source={require('../assets/signIn11.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Image source={require('../assets/signUp11.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Image source={require('../assets/google.png')} style={styles.buttonImage} />
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
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
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
    marginVertical: -20,
  },
  buttonImage: {
    width: 310,
    height: 90,
    resizeMode: 'contain',
  },
});

export default MainPageLogin;

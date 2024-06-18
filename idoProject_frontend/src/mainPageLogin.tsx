import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { userModel } from './model/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const MainPageLogin: FC<{navigation: any}> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '579314929961-qt3s0oeiatdck9be8lca75tiam7emoda.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleLogin(authentication?.accessToken);
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      console.log('Logging in with email:', email, 'and password:', password);
      const response = await userModel.loginUser({
        _id: '',
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
        Alert.alert('Error', 'Login failed. Please check your email and password.');
      }
    } catch (error: unknown) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Login failed. Please check your email and password.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegistrationPage');
  };

  const handleGoogleLogin = async (token: string | undefined) => {
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userInfo = await userInfoResponse.json();
      console.log('Google user info:', userInfo);

      const response = await userModel.googleUser({
        _id: '',
        name: userInfo.name ?? '',
        email: userInfo.email ?? '',
        password: '',
        age: 0,
        imgUrl: userInfo.picture ?? '',
      });

      const { accessToken, refreshToken } = response;
      if (accessToken && refreshToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        console.log('Logged in successfully with Google');

        navigation.navigate('FeedPage');
      } else {
        console.error('No token found in response');
        Alert.alert('Error', 'Login with Google failed. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Google login error:', error);
      Alert.alert('Error', 'Login with Google failed. Please try again.');
    }
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
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
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

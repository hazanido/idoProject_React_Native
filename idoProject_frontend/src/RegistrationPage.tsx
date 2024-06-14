import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userModel } from './model/user';

const RegistrationPage: FC<{navigation: any}> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = async () => {
    try {
      const response = await userModel.createUser({
        name: name,
        email: email,
        password: password,
        age: parseInt(age, 10),
        imgUrl: '',
        id: undefined,
      });
      Alert.alert('Success', 'Registration successful. Please log in.');
      navigation.navigate('MainPageLogin');
    } catch (error: any) {
      console.error('Error registering:', error);
      if (error.message && error.message === 'Email already in use') {
        Alert.alert('Error', 'Email already in use. Please try again with a different email.');
      } else {
        Alert.alert('Error', error.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשמה</Text>
      <TextInput
        style={styles.input}
        placeholder="הכנס שם"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="הכנס גיל"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Image source={require('../assets/Register.png')} style={styles.buttonImage} />
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

export default RegistrationPage;

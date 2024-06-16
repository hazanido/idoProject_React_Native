import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPageLogin from './src/mainPageLogin'; 
import RegistrationPage from './src/RegistrationPage';
import FeedPage from './src/FeedPage';
import AddPostPage from './src/AddPostPage';
import ProfilePage from './src/ProfilePage';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPageLogin">
      <Stack.Screen
          name="MainPageLogin"
          component={MainPageLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          options={{ title: 'Registration' }}
        />
        <Stack.Screen
          name="FeedPage"
          component={FeedPage}
          options={{ title: 'Feed' }}
        />
        <Stack.Screen
          name="AddPostPage"
          component={AddPostPage}
          options={{ title: 'Add Post' }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

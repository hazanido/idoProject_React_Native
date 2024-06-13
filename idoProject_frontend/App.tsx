import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import mainPageLogin from './src/mainPageLogin'; 
import RegistrationPage from './src/RegistrationPage';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mainPageLogin">
      <Stack.Screen
          name="mainPageLogin"
          component={mainPageLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
          options={{ title: 'הרשמה' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

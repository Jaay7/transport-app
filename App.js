import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './pages/SignupScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen2 from './pages/SignupScreen2';
import DealerPages from './pages/dealer';
import DriverPages from './pages/driver';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {

  const [loggedIn, isLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState('');

    React.useEffect(() => {
      const checkLoggedIn = async () => {
        try {
          const value = await AsyncStorage.getItem('userId');
          const user = await AsyncStorage.getItem('userType');
          if (value !== null) {
            isLoggedIn(true);
          }
          if (user !== null) {
            setUserType(user);
          }
        } catch (e) {
          // error reading value
          console.log(e);
        }
      }
      checkLoggedIn();
    }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedIn ? userType === 'Dealer' ? "DealerPages" : "DriverPages" : "onBoarding"}
      >
        <Stack.Screen 
          name="onBoarding" 
          component={SignupScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen2}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="DealerPages" 
          component={DealerPages} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DriverPages"
          component={DriverPages}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

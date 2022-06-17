import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import { Text, HStack, VStack, Pressable } from "@react-native-material/core";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import MyRequestsScreen from "./MyRequestsScreen";
import ProfileScreen from "./ProfileScreen";

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  const [revealed, setRevealed] = useState(false);
  // const userType = AsyncStorage.getItem('userType');
  const [userType, setUserType] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const getUserType = async () => {
        const userType = await AsyncStorage.getItem('userType');
        setUserType(userType);
      };
      getUserType();
    }, [])
  )

  const logout = async() => {
    await AsyncStorage.removeItem('userType');
    await AsyncStorage.removeItem('userId');
    navigation.navigate('onBoarding');
  }

  return (
    <Backdrop
      style={{
        backgroundColor: "#000",
      }}
      revealed={revealed}
      header={
        <AppBar
          title={userType}
          transparent
          leading={props => (
            <IconButton
              icon={props => (
                <Icon name={revealed ? "close" : "menu"} {...props} />
              )}
              onPress={() => setRevealed(prevState => !prevState)}
              {...props}
            />
          )}
        />
      }
      backLayer={
        <View style={{ paddingVertical: 20 }}>
          <VStack center>
            <View>
              <Pressable
                onPress={() => {
                  setSelectedItem(0);
                  navigation.navigate('DriverHome');
                  setRevealed(false);
                }}
              >
                <HStack ph={16} pv={10}>
                  <Feather name="home" size={20} color={selectedItem === 0 ? "white" : "gray"} />
                  <Text style={{ color: selectedItem === 0 ? "white" : "gray", paddingLeft: 16 }}>Home</Text>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelectedItem(1);
                  navigation.navigate('MyRequests');
                  setRevealed(false);
                }}
              >
                <HStack ph={16} pv={10}>
                  <MaterialIcons name="emoji-transportation" size={22} color={selectedItem === 1 ? "white" : "gray"} />
                  <Text style={{ color: selectedItem === 1 ? "white" : "gray", paddingLeft: 16 }}>My Requests</Text>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelectedItem(2);
                  navigation.navigate('DriverProfile');
                  setRevealed(false);
                }}
              >
                <HStack ph={16} pv={10}>
                  <Feather name="user" size={20} color={selectedItem === 2 ? "white" : "gray"} />
                  <Text style={{ color: selectedItem === 2 ? "white" : "gray", paddingLeft: 16 }}>Profile</Text>
                </HStack>
              </Pressable>
              <Pressable
                onPress={() => {
                  logout();
                  setRevealed(false);
                }}
              >
                <HStack ph={16} pv={10}>
                  <MaterialIcons name="logout" size={22} color="gray" />
                  <Text style={{ color: "gray", paddingLeft: 16 }}>Logout</Text>
                </HStack>
              </Pressable>
            </View>
          </VStack>
        </View>
      }
    >
      <Stack.Navigator>
        <Stack.Screen 
          name="DriverHome" 
          component={HomeScreen} 
          options={{
            headerShown: false,
            contentStyle: {
              marginTop: 10,
              backgroundColor: "#fff",
              paddingHorizontal: 16,
            },
          }}
        />
        <Stack.Screen 
          name="MyRequests" 
          component={MyRequestsScreen} 
          options={{
            headerShown: false,
            contentStyle: {
              marginTop: 10,
              backgroundColor: "#fff",
              paddingHorizontal: 16,
            },
          }}
        />
        <Stack.Screen 
          name="DriverProfile" 
          component={ProfileScreen} 
          options={{
            headerShown: false,
            contentStyle: {
              marginTop: 10,
              backgroundColor: "#fff",
              paddingHorizontal: 16,
            },
          }}
        />
      </Stack.Navigator>
      {/* <BackdropSubheader title={<Text>Drivers in Vijayawada</Text>} /> */}
      {/* <Text>dfvjndfj</Text> */}
    </Backdrop>
  );
};

export default App;
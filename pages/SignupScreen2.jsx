import React from 'react'
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { Flex, HStack, VStack, Text, TextInput, Button } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen2 = ({route, navigation}) => {
  const { userType, name, email, password, mobile } = route.params;
  // dealer
  const [natureOfMaterial, setNatureOfMaterial] = React.useState('');
  const [weightOfMaterial, setWeightOfMaterial] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // driver
  const [age, setAge] = React.useState();
  const [truckNumber, setTruckNumber] = React.useState('');
  const [truckCapacity, setTruckCapacity] = React.useState();
  const [transporterName, setTransporterName] = React.useState('');
  const [drivingExperience, setDrivingExperience] = React.useState();
  const [route1, setRoute1] = React.useState('');
  const [route2, setRoute2] = React.useState('');
  const [route3, setRoute3] = React.useState('');

  const registerDealer = () => {
    setLoading(true);
    axios.post('https://transport-backend-apis.herokuapp.com/api/dealer/addDealer', {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      natureOfMaterial: natureOfMaterial,
      weightOfMaterial: weightOfMaterial,
      quantity: quantity,
      city: city,
      state: state
    })
    .then(res => {
      console.log(res);
      AsyncStorage.setItem('userType', 'Dealer');
      AsyncStorage.setItem('userId', res.data.id.toString());
      navigation.navigate('DealerPages');
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const registerDriver = () => {
    setLoading(true);
    axios.post('https://transport-backend-apis.herokuapp.com/api/driver/addDriver', {
      name: name,
      email: email,
      password: password,
      age: age,
      truckNumber: truckNumber,
      mobile: mobile,
      truckCapacity: truckCapacity,
      transporterName: transporterName,
      drivingExperience: drivingExperience,
      route1: route1,
      route2: route2,
      route3: route3
    })
    .then(res => {
      console.log(res);
      AsyncStorage.setItem('userType', 'Driver');
      AsyncStorage.setItem('userId', res.data.id.toString());
      navigation.navigate('DriverPages');
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <VStack justify="center" m={16} spacing={2}>
        <ScrollView>
          <HStack items="center">
            <Ionicons 
              name="arrow-back-circle" 
              size={26} 
              color="black" 
              onPress={() => navigation.goBack()}
            />
            <Text variant="body2" style={{paddingLeft: 10}}>Few details required {userType},</Text>
          </HStack>
          {userType === 'dealer' ? 
          <>
            <TextInput 
              variant="standard" 
              label="Nature of Material" 
              color='black'
              style={{ marginTop: 16 }} 
              value={natureOfMaterial}
              onChangeText={(text) => setNatureOfMaterial(text)}
            />
            <TextInput 
              variant="standard" 
              label="Weight of Material" 
              color='black'
              style={{ marginTop: 16 }} 
              value={weightOfMaterial}
              onChangeText={(text) => setWeightOfMaterial(text)}
            />
            <TextInput 
              variant="standard" 
              label="Quantity" 
              color='black'
              style={{ marginTop: 16 }} 
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <TextInput 
              variant="standard" 
              label="State" 
              color='black'
              style={{ marginTop: 16 }} 
              value={state}
              onChangeText={(text) => setState(text)}
            />
            <TextInput 
              variant="standard" 
              label="City" 
              color='black'
              style={{ marginTop: 16 }} 
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </> : <>
          {/* driver */}
            <TextInput 
              variant="standard" 
              label="Age" 
              color='black'
              style={{ marginTop: 16 }} 
              value={age}
              onChangeText={(text) => setAge(text)}
            />
            <TextInput 
              variant="standard" 
              label="Truck Number" 
              color='black'
              style={{ marginTop: 16 }} 
              value={truckNumber}
              onChangeText={(text) => setTruckNumber(text)}
            />
            <TextInput 
              variant="standard" 
              label="Truck Capacity" 
              color='black'
              style={{ marginTop: 16 }} 
              value={truckCapacity}
              onChangeText={(text) => setTruckCapacity(text)}
            />
            <TextInput 
              variant="standard" 
              label="Transporter Name" 
              color='black'
              style={{ marginTop: 16 }} 
              value={transporterName}
              onChangeText={(text) => setTransporterName(text)}
            />
            <TextInput 
              variant="standard" 
              label="Driving Experience" 
              color='black'
              style={{ marginTop: 16 }} 
              value={drivingExperience}
              onChangeText={(text) => setDrivingExperience(text)}
            />
            <TextInput 
              variant="standard" 
              label="Route1" 
              color='black'
              style={{ marginTop: 16 }} 
              value={route1}
              onChangeText={(text) => setRoute1(text)}
            />
            <TextInput 
              variant="standard" 
              label="Route2" 
              color='black'
              style={{ marginTop: 16 }} 
              value={route2}
              onChangeText={(text) => setRoute2(text)}
            />
            <TextInput 
              variant="standard" 
              label="Route3" 
              color='black'
              style={{ marginTop: 16 }} 
              value={route3}
              onChangeText={(text) => setRoute3(text)}
            />
          </>
          }
          <Button 
            onPress={() => {
              userType === 'dealer' ? registerDealer() : registerDriver()
            }}
            title="Signup" 
            uppercase={false}
            color="black" 
            style={{ marginTop: 16 }}
            loading={loading}
            loadingIndicatorPosition="trailing"
          />
          <HStack center mv={20}>
            <Text variant="body2" color="gray">Already have an account?</Text>
            <Text variant="body2" onPress={() => navigation.navigate('Login')}> Login</Text>
          </HStack>
        </ScrollView>
      </VStack>
    </View>
  )
}

export default SignupScreen2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

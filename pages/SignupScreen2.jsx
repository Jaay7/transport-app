import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Flex, HStack, VStack, Text, TextInput, Button } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen2 = ({route, navigation}) => {
  const { userType, name, email, password, mobile } = route.params;
  const [natureOfMaterial, setNatureOfMaterial] = React.useState('');
  const [weightOfMaterial, setWeightOfMaterial] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
    console.log(userType, name, email, password, mobile, state, city)
  }
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <VStack justify="center" m={16} spacing={2}>
        <View>
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
            />
            <TextInput 
              variant="standard" 
              label="Truck Number" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Truck Capacity" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Transporter Name" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Driving Experience" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Route1" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Route2" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Route3" 
              color='black'
              style={{ marginTop: 16 }} 
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
        </View>
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

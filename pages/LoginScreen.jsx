import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Flex, HStack, VStack, Text, TextInput, Button, Divider } from '@react-native-material/core'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const checkFields = () => {
    if(email.length > 0 && password.length > 0){
      return true;
    }
    return false;
  }

  const handleDealerLogin = async() => {
    setLoading(true);
    await axios.post('https://transport-backend-apis.herokuapp.com/api/dealer/login', {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res)
      AsyncStorage.setItem('userType', 'Dealer');
      AsyncStorage.setItem('userId', res.data.id.toString());
      navigation.navigate('DealerPages');
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDriverLogin = async() => {
    setLoading(true);
    await axios.post('https://transport-backend-apis.herokuapp.com/api/driver/login', {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res)
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
      <VStack justify="center" mh={20} spacing={2}>
        <View>
          <Text variant="h6">Login here,</Text>
          <TextInput 
            variant="standard" 
            label="Email" 
            color='black'
            style={{ marginTop: 16 }} 
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput 
            variant="standard" 
            label="Password"
            secureTextEntry={true}
            color='black'
            style={{ marginTop: 16 }} 
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button 
            disabled={checkFields() ? false : true}
            onPress={handleDealerLogin}
            title="Login as Dealer" 
            uppercase={false}
            color="black" 
            style={{ marginTop: 16 }}
            loading={loading}
            loadingIndicatorPosition="trailing"
          />
          <HStack center mt={16}>
            <Divider />
            <Text>OR</Text>
            <Divider />
          </HStack>
          <Button 
            disabled={checkFields() ? false : true}
            onPress={handleDriverLogin}
            title="Login as Driver" 
            uppercase={false}
            loading={loading}
            loadingIndicatorPosition="trailing"
            color="black" 
            style={{ marginTop: 16 }}
          />
          <HStack center mv={20}>
            <Text variant="body2" color="gray">Don't have an account?</Text>
            <Text variant="body2" onPress={() => navigation.navigate('onBoarding')}> Signup</Text>
          </HStack>
        </View>
      </VStack>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Flex, HStack, VStack, Text, TextInput, Button } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons';

const SignupScreen2 = ({route, navigation}) => {
  const { userType } = route.params;
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
            <Text variant="h6" style={{paddingLeft: 10}}>Few details required {userType},</Text>
          </HStack>
          {userType === 'dealer' ? 
          <>
            <TextInput 
              variant="standard" 
              label="Nature of Material" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Weight of Material" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="Quantity" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="State" 
              color='black'
              style={{ marginTop: 16 }} 
            />
            <TextInput 
              variant="standard" 
              label="City" 
              color='black'
              style={{ marginTop: 16 }} 
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
            onPress={() => navigation.navigate('Login')}
            title="Signup" 
            uppercase={false}
            color="black" 
            style={{ marginTop: 16 }}
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

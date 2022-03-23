import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Flex, HStack, VStack, Text, TextInput, Button, Divider } from '@react-native-material/core'

const LoginScreen = ({navigation}) => {
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
          />
          <TextInput 
            variant="standard" 
            label="Password"
            secureTextEntry={true}
            color='black'
            style={{ marginTop: 16 }} 
          />
          <Button 
            onPress={() => navigation.navigate('Signup')}
            title="Login as Dealer" 
            uppercase={false}
            color="black" 
            style={{ marginTop: 16 }}
          />
          <HStack center mt={16}>
            <Divider />
            <Text>OR</Text>
            <Divider />
          </HStack>
          <Button 
            onPress={() => navigation.navigate('Signup')}
            title="Login as Driver" 
            uppercase={false}
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

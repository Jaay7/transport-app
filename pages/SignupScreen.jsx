import React from 'react'
import { View, StatusBar, StyleSheet, Picker } from 'react-native'
import { Divider, HStack, VStack, Text, TextInput, Button } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons';

const SignupScreen = ({navigation}) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  return (
    <View style={styles.container}>
      <StatusBar />
      <VStack justify="center" mh={20} spacing={2}>

        <View>
          <Text variant="h6">Fill out basic details,</Text>
          <TextInput 
            variant="standard" 
            label="Name" 
            color='black'
            style={{ marginTop: 16 }} 
          />
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
          <TextInput 
            variant="standard" 
            label="Mobile Number" 
            color='black'
            style={{ marginTop: 16 }} 
          />
          <Picker
            required
            selectedValue={selectedValue}
            style={{ height: 50, marginTop: 16}}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Dealer" value="dealer" />
            <Picker.Item label="Driver" value="driver" />
          </Picker>
          <Divider color="#929292" />
          <Button 
            onPress={() => navigation.navigate('Signup', {userType: selectedValue})}
            title="Continue to Next" 
            color="black" 
            uppercase={false}
            trailing={<AntDesign name="arrowright" size={18} color="white" />}
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

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

import React from 'react'
import { View, StatusBar, StyleSheet, Picker } from 'react-native'
import { Divider, HStack, VStack, Text, TextInput, Button } from '@react-native-material/core'
import { AntDesign } from '@expo/vector-icons';

const SignupScreen = ({navigation}) => {
  const [selectedValue, setSelectedValue] = React.useState("dealer");
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const checkFields = () => {
    if(name.length > 0 && email.length > 0 && password.length > 0 && mobile.length > 0){
      return true;
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <VStack justify="center" mh={20} spacing={2}>
        <Text variant="h6" style={{alignSelf: 'center', paddingVertical: 20}}>Let's start Registration...</Text>
        <View>
          <Text variant="body1">Fill out basic details,</Text>
          <TextInput 
            variant="standard" 
            label="Name" 
            color='black'
            style={{ marginTop: 16 }} 
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
          <TextInput 
            variant="standard" 
            label="Mobile Number" 
            color='black'
            style={{ marginTop: 16 }} 
            value={mobile}
            onChangeText={(text) => setMobile(text)}
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
            disabled={checkFields() ? false : true}
            onPress={() => navigation.navigate('Signup', {userType: selectedValue, name: name, email: email, password: password, mobile: mobile})}
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

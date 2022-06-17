import React from 'react'
import { ActivityIndicator, HStack, Spacer, Stack, Surface, Text } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {

  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      const getUserId = async () => {
        setLoading(true);
        const value = await AsyncStorage.getItem('userId');
        await axios.get(`https://transport-backend-apis.herokuapp.com/api/driver/getDriver/${Number(value)}`)
          .then(res => {
            console.log(res);
            setUserData(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      };
      getUserId();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, alignSelf: 'center', fontWeight: 'bold', height: 40}}>Profile</Text>
      {loading ? 
        <Stack fill center spacing={4}>
          <ActivityIndicator size="large" color="black" />
        </Stack> : 
        userData && (
          <ScrollView>
            <Stack fill>
              <Text>Basic Info</Text>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Name</Text>
                  <Spacer />
                  <Text>{userData.name}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Email</Text>
                  <Spacer />
                  <Text>{userData.email}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Mobile Number</Text>
                  <Spacer />
                  <Text>{userData.mobile}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Age</Text>
                  <Spacer />
                  <Text>{userData.age}</Text>
                </HStack>
              </Surface>
              <Text style={{marginTop: 16}}>Additional Details</Text>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Truck Number</Text>
                  <Spacer />
                  <Text>{userData.truckNumber}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Transporter Name</Text>
                  <Spacer />
                  <Text>{userData.transporterName}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Driving Experience</Text>
                  <Spacer />
                  <Text>{userData.drivingExperience}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Route 1</Text>
                  <Spacer />
                  <Text>{userData.route1}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Route 2</Text>
                  <Spacer />
                  <Text>{userData.route2}</Text>
                </HStack>
              </Surface>
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack>
                  <Text color='gray'>Route 3</Text>
                  <Spacer />
                  <Text>{userData.route3}</Text>
                </HStack>
              </Surface>
            </Stack>
          </ScrollView>
        )
      }
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center'
  }
})
import React from 'react'
import { ActivityIndicator, HStack, Spacer, Stack, Text, Surface, Pressable, VStack, Divider, Button } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

const HomeScreen = () => {

  const [city, setCity] = React.useState('');
  const [drivers, setDrivers] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState({
    id: 0,
    value: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      const getUser = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await axios.get(`https://transport-backend-apis.herokuapp.com/api/dealer/getDealer/${Number(userId)}`)
          .then(async res => {
            console.log(res)
            setCity(res.data.city);
          })
          .catch(err => {
            console.log(err)
          })
      }
      getUser();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const getDrivers = async () => {
        await axios.get(`https://transport-backend-apis.herokuapp.com/api/dealer/getDriversByRoutes/${city}`)
          .then(res => {
            console.log(res)
            setDrivers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err)
          })
      }
      getDrivers();
    }, [city])
  )

  const requestDriver = async (driverId) => {
    const dealerId = await AsyncStorage.getItem('userId');
    await axios.post(`https://transport-backend-apis.herokuapp.com/api/dealer/requestDriver/${dealerId}/${driverId}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const removeRequest = async (cartId, driverId) => {
    const dealerId = await AsyncStorage.getItem('userId');
    await axios.delete(`https://transport-backend-apis.herokuapp.com/api/dealer/removeRequest/${cartId}/${dealerId}/${driverId}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <View style={styles.container}>
      <HStack>
        <MaterialIcons name="location-on" size={24} color="black" />
        <Text>Drivers in {city}</Text>
      </HStack>
      {loading ?
        <Stack fill center spacing={4}>
        <ActivityIndicator size="large" color="black" />
      </Stack> : <>
        {drivers && drivers.length > 0 ? drivers.map((driver, index) => {
          return (
            <Pressable 
              onPress={() => expanded.id === driver.id ? setExpanded({id: 0, value: false}) : setExpanded({id: driver.id, value: true})}
              pressEffect="opacity"
            >
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack key={driver.id}>
                  <Text>{driver.name}</Text>
                  <Spacer />
                  <Text>{driver.mobile}</Text>
                  <Spacer />
                  {expanded.id === driver.id && expanded.value ?
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> :
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                  }
                </HStack>
                {expanded.id === driver.id && expanded.value ?
                  <>
                    <Divider style={{marginVertical: 10}} />
                    <VStack>
                      <HStack>
                        <Text color="gray">Age</Text>
                        <Spacer />
                        <Text>{driver.age} years</Text>
                      </HStack>
                      <HStack>
                        <Text color="gray">Mobile Number</Text>
                        <Spacer />
                        <Text>{driver.mobile}</Text>
                      </HStack>
                      <HStack>
                        <Text color="gray">Truck Number</Text>
                        <Spacer />
                        <Text>{driver.truckNumber}</Text>
                      </HStack>
                      <HStack>
                        <Text color="gray">Truck Capacity</Text>
                        <Spacer />
                        <Text>{driver.truckCapacity} tonnes</Text>
                      </HStack>
                    </VStack>
                    {
                      driver.reqByDealer === 'none' && driver.accByDriver === 'none' ?
                      <Button 
                        onPress={() => requestDriver(driver.id)}
                        style={{marginVertical: 10}}
                        title="Book Driver"
                        color="black"
                        tintColor='white'
                      /> :
                      driver.reqByDealer === 'sent' && driver.accByDriver === 'pending' ?
                      <HStack center mt={20}>
                        <Text>Request Pending, </Text>
                        <Spacer />
                        <Button
                          onPress={() => removeRequest(driver.cartId, driver.id)}
                          title="Cancel"
                          color="red"
                          tintColor='white'
                          uppercase={false}
                        />
                      </HStack> :
                      driver.reqByDealer === 'done' && driver.accByDriver === 'accepted' ?
                      <HStack center mt={20}>
                        <Text>Booked! </Text>
                        <Spacer />
                        <Button
                          onPress={() => removeRequest(driver.cartId, driver.id)}
                          title="Cancel"
                          color="red"
                          tintColor='white'
                          uppercase={false}
                        />
                      </HStack> : <></>
                    }
                  </>: null
                }
              </Surface>
            </Pressable>
          )
        }) : <Text>No drivers found</Text>}
      </>
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    marginVertical: 12,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center'
  }
})
import React from 'react'
import { ActivityIndicator, HStack, Spacer, Stack, Text, Surface, Pressable, VStack, Divider, Button } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

const MyDriversScreen = () => {
  
  const [myDrivers, setMyDrivers] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState({
    id: 0,
    value: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const getMyDrivers = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await axios.get(`https://transport-backend-apis.herokuapp.com/api/dealer/getRequestedDrivers/${userId}`)
          .then(res => {
            console.log(res)
            setMyDrivers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err)
          })
      }
      getMyDrivers();
    }, [])
  )

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
        <Text>My Drivers</Text>
      {loading ?
        <Stack fill center spacing={4}>
        <ActivityIndicator size="large" color="black" />
      </Stack> : <>
        {myDrivers && myDrivers.length > 0 ? myDrivers.map((driver, index) => {
          return (
            <Pressable 
              onPress={() => expanded.id === driver.driverId ? setExpanded({id: 0, value: false}) : setExpanded({id: driver.driverId, value: true})}
              pressEffect="opacity"
            >
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack key={driver.driverId}>
                  <Text>{driver.name}</Text>
                  <Spacer />
                  <Text>{driver.mobile}</Text>
                  <Spacer />
                  {expanded.id === driver.driverId && expanded.value ?
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> :
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                  }
                </HStack>
                {expanded.id === driver.driverId && expanded.value ?
                  <>
                    <Divider style={{marginVertical: 10}} />
                    {
                      driver.reqByDealer === 'sent' && driver.accByDriver === 'pending' ?
                      <HStack center mt={10}>
                        <Text>Request Pending, </Text>
                        <Spacer />
                        <Button
                          onPress={() => removeRequest(driver.cartId, driver.driverId)}
                          title="Cancel"
                          color="red"
                          tintColor='white'
                          uppercase={false}
                        />
                      </HStack> :
                      driver.reqByDealer === 'done' && driver.accByDriver === 'accepted' ?
                      <HStack center mt={10}>
                        <Text>Booked! </Text>
                        <Spacer />
                        <Button
                          onPress={() => removeRequest(driver.cartId, driver.driverId)}
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

export default MyDriversScreen

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
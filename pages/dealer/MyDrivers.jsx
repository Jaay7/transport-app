import React from 'react'
import { ActivityIndicator, HStack, Spacer, Stack, Text, Surface, Pressable, VStack, Divider } from '@react-native-material/core'
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
        await axios.get(`http://localhost:5000/api/dealer/getRequestedDrivers/${userId}`)
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
                    <VStack>
                      <HStack>
                        <Text color="gray">Age</Text>
                        <Spacer />
                        <Text>{driver.age}</Text>
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
                        <Text>{driver.truckCapacity}</Text>
                      </HStack>
                    </VStack>
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
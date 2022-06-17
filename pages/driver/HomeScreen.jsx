import React from 'react'
import { ActivityIndicator, HStack, Spacer, Stack, Text, Surface, Pressable, Button, Divider, VStack } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

const HomeScreen = () => {

  const [loading, setLoading] = React.useState(false);
  const [myDealers, setMyDealers] = React.useState();
  const [expanded, setExpanded] = React.useState({
    id: 0,
    value: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const getMyDealers = async () => {
        const driverId = await AsyncStorage.getItem('userId');
        await axios.get(`https://transport-backend-apis.herokuapp.com/api/driver/getAcceptedDealers/${driverId}`)
          .then(res => {
            console.log(res)
            setMyDealers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err)
          })
      }
      getMyDealers();
    }, [])
  )

  const removeRequest = async (cartId, dealerId) => {
    const driverId = await AsyncStorage.getItem('userId');
    await axios.delete(`https://transport-backend-apis.herokuapp.com/api/driver/removeRequest/${cartId}/${dealerId}/${driverId}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, alignSelf: 'center', fontWeight: 'bold', height: 40}}>Home</Text>
      {loading ?
        <Stack fill center spacing={4}>
        <ActivityIndicator size="large" color="black" />
      </Stack> : <>
        {myDealers && myDealers.length > 0 ? myDealers.map((dealer, index) => {
          return (
            <Pressable 
              onPress={() => expanded.id === dealer.dealerId ? setExpanded({id: 0, value: false}) : setExpanded({id: dealer.dealerId, value: true})}
              pressEffect="opacity" key={index}
            >
              <Surface elevation={2} category="medium" style={styles.card}>
                <HStack key={dealer.dealerId} center>
                  <Text
                    style={styles.name}
                  >{dealer.name}</Text>
                  <Spacer />
                  <Text>Dealer Id: {dealer.dealerId}</Text>
                  <Spacer />
                  {expanded.id === dealer.dealerId && expanded.value ?
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> :
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                  }
                </HStack>
                {expanded.id === dealer.dealerId && expanded.value ?
                  <>
                    <Divider style={{marginVertical: 10}} />
                      <HStack mv={12}>
                        <Text>Accepted, </Text>
                        <Spacer />
                        <Button 
                          title="Remove"
                          onPress={() => { 
                            removeRequest(dealer.cartId, dealer.dealerId);
                          }}
                          uppercase={false}
                          color="#f52e2e"
                          tintColor='white'
                        />
                      </HStack>
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
  },
  name: {
    width: '50%',
  }
})
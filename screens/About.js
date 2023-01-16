import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button,Text} from '@rneui/base'
import {auth,db} from '../firebase'
import * as Location from 'expo-location'


const About = ({navigation}) => {

const [btntitle, setbtntitle] = useState("Start Watching")
const [latitude, setLatitude] = useState(0.0)
const [longitude, setLongitude] = useState(0.0)
const [subscription, setSubscription] = useState(null);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    const handleListeners = async () => {
        setbtntitle('Stop Watching')
        if (subscription) {
          subscription.remove();
          console.log('Stop watching!', subscription);
    
          setSubscription(null);
          setLatitude(0.0)
          setLongitude(0.0)
         
        }else{
        try {
          const enabled = await  Location.hasServicesEnabledAsync();
          console.log('Location is  enabled', enabled)
    
          const getPermission =await Location.getForegroundPermissionsAsync();
          let granted = getPermission.granted
          if(!granted){
            const requestPermission = await Location.requestForegroundPermissionsAsync()
            granted = requestPermission.granted
          }
    
          const options = {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1
          }
          const location = await Location.getCurrentPositionAsync(options);
    
          const callback = (location) => {
            console.log("Watched Location", location)
          }
          const { latitude, longitude } = location.coords;
    
          const subscription = await Location.watchPositionAsync(options, callback);
          setSubscription(subscription)
          setLatitude(latitude)
          setLongitude(longitude)
    
        } catch (error) {
          console.log(error)
        }
      }
      }

      useEffect(() => {
        handleListeners()
      }, [])
          
  return (
    <View style={styles.container}>
      <Text h3 style={styles.text} >Name: {auth.currentUser.displayName}</Text>
      <Text h3 style={styles.text}>Email: {auth.currentUser.email} </Text>
      <Text h3 style={styles.text}>
          Location: ({latitude}, {longitude})
       </Text>
      <Button
            onPress={signOut}
            title="Logout"
            raised
            buttonStyle={{ backgroundColor: '#E63946' }} 
            containerStyle={styles.button}
        />
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginLeft: 80,
        marginTop:100
        
    },
    container: {
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
    },
    text:{
        marginLeft:60,
        padding: 20
    }
})
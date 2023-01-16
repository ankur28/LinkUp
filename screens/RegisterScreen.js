import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from '@rneui/base'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth } from '../firebase'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
    handleSuccess: (result) => {
      console.log('Display Success:', result);
      },
    handleError: (error) => {
      console.log('Display Error:', error);
      }
  });
  
  Notifications.requestPermissionsAsync({
    ios: {
    allowAlert: true,
    allowSound: true,
    allowBadge: true
    },
    }).then((request) => {
    console.log('Request:', request);
    }).catch((error) => {
    console.log('Error:', error);
    });


const RegisterScreen = ({navigation}) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')


    function handleScheduleNotification() {
        console.log("btn clicked", Platform.OS)
        schedulePushNotification()
      }
      
      async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Welcome to Linkup 📬",
            body: 'Create new chat room or continue in Home screen',
          },
          trigger: { seconds: 1,
          },
        })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      }

const register = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
        updateProfile(authUser.user, {
            displayName: fullName, photoURL: imageUrl
            })
    })
    .catch((error) => {
        console.log(error.message)
        alert(error.message)
    })

    handleScheduleNotification()
}


useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification Received:', notification);
    });
    console.log('Subscription:', subscription);
    return () => {
    subscription.remove();
    }
    }, []);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style='light' />

        <Text h3 style={{ marginBottom: 30, marginLeft: 25,}} >
            Create a LinkUp account
        </Text>
        <View style={styles.inpuContainer}>
            <Input 
                placeholder='Full Name'
                type="text"
                value={fullName}
                onChangeText={(text) =>setFullName(text)}
            />
            <Input 
                placeholder='Email'
                type="text"
                value={email}
                onChangeText={(text) =>setEmail(text)}
            />
            <Input 
                placeholder='Password'
                type="text"
                value={password}
                secureTextEntry
                onChangeText={(text) =>setPassword(text)}
            />
            <Input 
                placeholder='Profile Picture URL (Optional)'
                type="text"
                value={imageUrl}
                onChangeText={(text) =>setImageUrl(text)}
            />
        </View>
        <Button
            onPress={register}
            title="Register"
            raised
            buttonStyle={{ backgroundColor: '#E63946' }} 
            containerStyle={styles.button}
        >
        </Button>
        <View style={{ height: 100}}></View>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginLeft: 80,

    },
    inpuContainer: {
        width: 300,
        marginLeft: 30,

    }
})
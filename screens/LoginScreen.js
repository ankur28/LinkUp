import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
// import { styles } from '../styles/main.js';
import { Button, Input, Image, Text} from '@rneui/base'
import { StatusBar } from 'expo-status-bar';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'

var logo = require ('../assets/logo.png');



const LoginScreen = ({ navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                   {/* add empty view to remove back button */}
                </View>
            ),
        })
    })

    useEffect(() => {
        const auth = getAuth()
      const unsubscribe =  onAuthStateChanged(auth, (authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])
    

const signIn= () => {
    signInWithEmailAndPassword(getAuth(), email, password)
    .catch(error => alert(error.message)) 
}

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View>
        <StatusBar style='light' />
        <Image
         source= {logo}
         style={{ width: 350, height: 200}}
         />
         <View style={styles.Inputcontainer}>
            <Input  
                placeholder='Email'
                type="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input  
                placeholder='Password'
                secureTextEntry
                type="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}

            />
         </View>

         <Button containerStyle={styles.button} 
                buttonStyle={{ backgroundColor: '#E63946' }} 
                title="Login"
                onPress={signIn} />

         <Button 
         buttonStyle={{
            color: '#E63946',
            borderColor: '#E63946'

          }} 
          titleStyle={{
            color: '#E63946',
          }}
         containerStyle={styles.button}
          type="outline" title="Regsiter" 
          onPress={() => navigation.navigate('Register')}
          />
         <View style={{ height: 100}}></View>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white'

    }, 
    button: {
        marginTop: 10,
        marginLeft: 80,

        width: 200
    },
    Inputcontainer: {
        marginLeft: 30,
        width: 300
    }
})

export default LoginScreen


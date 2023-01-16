import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button} from '@rneui/base'
import Icon from "react-native-vector-icons/FontAwesome";
import {db} from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 

const AddChat = ({navigation}) => {
    const [input, setInput] = useState('')

    const createChat =async () => {
         await addDoc(collection(db, 'chats'), {
            chatName: input
         })
        .then(() => {
            navigation.goBack()
         }).catch((error) => alert(error.message))
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "Home",
        title: "Add a new Chat"
      })
    }, [navigation])

  return (
    <View style={styles.container}>
        <Input placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
            <Icon name='wechat' type="antdesign" size={25} color='black' />
        }
        />
        <Button disabled={!input} onPress={createChat} containerStyle={styles.button}
         buttonStyle={{ backgroundColor: '#E63946' }} 
        title="Create new Chat"></Button>
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        padding: 30,
        height: '100%'
    },
    button: {
        width: "100%"
    },
}) 
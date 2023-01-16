import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar} from '@rneui/base'
import { db } from '../firebase'
import { collection ,getDocs} from "firebase/firestore"; 

const CustomListItem = ({ id, chatName, enterChat}) => {
const [chatMessages, setChatMessages] = useState([])

const chatData= []
const getChatMessages = async () =>{
  const querySnapshot = await getDocs(collection(db, `chats/${id}/messages`));
  querySnapshot.forEach((doc) => {
     chatData.push(
      doc.data()
     )
  })
  setChatMessages(chatData)
}


useEffect(() => {
  getChatMessages()
          }, [])


  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)  } >
      <Avatar 
        rounded
        source={{
            uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600"}}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle 
        ellipsizeMode='tail'
        numberOfLines={1} 
        >   {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}

        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
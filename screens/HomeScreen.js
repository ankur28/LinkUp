import { ScrollView, StyleSheet,  TouchableOpacity,  View } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Avatar,Text} from '@rneui/base'
import {auth, db} from '../firebase'
import { AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import {collection, getDocs } from "firebase/firestore"; 
import CustomListItem from '../components/CustomListItem';

const HomeScreen = ({navigation}) => {

    const [chats,setChats] = useState([])
    const docData = []
  

    const goToAbout=() =>{
        navigation.navigate('About')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "LinkUp",
            headerStyle: {backgroundColor:'white'},
            headerTitleStyle: { color: 'black' },
            headerLeft: () => (
                <View>
                    <TouchableOpacity 
                    onPress={goToAbout}
                     activeOpacity={0.5}>
                        <Avatar rounded source={{
                            uri: auth?.currentUser?.photoURL || "https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png"
                        }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:() => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent:"space-between",
                    width: 80
                }} >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black"></AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="black"></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            )
        })
    })

    const getFirestoreData = async () => {
        const querySnapshot = await getDocs(collection(db, "chats"));
            querySnapshot.forEach((doc) => {
                docData.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
         setChats(docData)
    }

    useEffect(  () => {
        getFirestoreData()
    }, [chats])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
        id: id,
        chatName: chatName
    })
  }

  return (
    <SafeAreaView>
        <StatusBar style='light' />
        <ScrollView style={styles.container}>
            {chats.map(({id, data:{ chatName }}) => (
            <CustomListItem key={id} id= {id} 
            chatName={chatName}
             enterChat={enterChat}/>
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height:'100%'
    }
})
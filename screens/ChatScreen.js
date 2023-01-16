import { Keyboard, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar,Text} from '@rneui/base'
import { SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {  Ionicons, FontAwesome} from '@expo/vector-icons'
import { collection, addDoc ,getDocs, orderBy, query} from "firebase/firestore"; 
import {auth, db} from '../firebase'
import {serverTimestamp} from 'firebase/firestore';


const ChatScreen = ({ navigation, route}) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const docsData = []
    useLayoutEffect(() => {
     navigation.setOptions({
        title:'Chat',
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTitle: () => (
        <View style= {{
            flexDirection: 'row',
            alignItems:'center'
        }}
        >
            <Avatar rounded source={{
            uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        }} />
            <Text style={{
                color:'white',
                marginLeft: 10,
                fontWeight: '700'
            }}
            >{route.params.chatName}</Text>
        </View>
        ),
        headerRight: () => (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width:80,
                marginRight: 20
            }}>
                <TouchableOpacity>
                    <FontAwesome  name="video-camera" size={24} color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome  name="phone" size={24} color="white"
                    />
                </TouchableOpacity>
            </View>
        )

     })
    }, [navigation])

    const sendMessage = async() => {
        Keyboard.dismiss()
        await addDoc(collection(db, `chats/${route.params.id}/messages`), {
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photURL: auth.currentUser.photoURL,
            timestamp: serverTimestamp()
        })
         .catch((error) => alert(error.message))

         setInput('')
    }
       
    const getChatMessages = async () =>{
        // let articlesSnapshot = await getDocs(query(articlesRef, orderBy('timestamp')));

        let chatRef = collection(db, `chats/${route.params.id}/messages`)
        const querySnapshot = await getDocs(query(chatRef), orderBy('timestamp'));
        querySnapshot.forEach((doc) => {
           docsData.push({
            id: doc.id,
            data:doc.data()
           })
        })
        setMessages(docsData)
    }
    useEffect(()=> {
        // const unsubscribe = 
        //     db.collection('chats')
        //     .doc(route.params.id)
        //     .collection('messages')
        //     .onSnapshot((snapshot) => setMessages(
        //             snapshot.docs.map((doc) => ({
        //                 id: doc.id,
        //                 data:doc.data()
        //             }))
        //         )
        //     )

        getChatMessages()
           
    },[route,messages]) 


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white '}}>
        <StatusBar style="light" />
        {/* slighjtly different behaviour in android so if not ios then add hieght */}
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? "padding" : "height"} 
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                {/* This will dismiss keyboard when we touch anywhere on screen */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <>
                <ScrollView>
                    {/* Chat goes here. */}
                    {messages.map(({id, data}) => 
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                                <Avatar  
                                    position='absolute'
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={25}
                                    source={{
                                    uri: auth?.currentUser?.photoURL || "https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png" 
                                }}/>
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ) : (
                            <View key={id} style={styles.sender}>
                                 <Avatar 
                                    position='absolute'
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={25}
                                    source={{
                                    uri: auth?.currentUser?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                                }}/>
                                  <Text style={styles.senderText}>{data.message}</Text>
                                  <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                        )
                    }
                </ScrollView>
                <View style={styles.footer}>
                    {/* This is footer */}
                    <TextInput value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder='Message'
                     style={styles.textInput}/>
                     <TouchableOpacity
                        onPress={sendMessage}
                        activeOpacity={0.5}
                        >
                       <Ionicons  name="send" size={24} color="#E63946" ></Ionicons>

                     </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        backgroundColor: '#ECECEC',
        borderColor: "transparent",
        marginRight:15,
        padding: 10,
        color: 'grey',
        borderRadius: 30

    },
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth:'80%',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#E63946',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth:'80%',
        position: 'relative'
    },
    recieverText:{
        color:'black',
        fontWeight: '500',
        marginRight: 10,
        marginBottom: 15
    },
    senderText:{
        color:'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15
    },
    senderName:{
        color: '#ECECEC'
    }
})
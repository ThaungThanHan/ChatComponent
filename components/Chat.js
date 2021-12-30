import React, {useState,useEffect} from 'react';
import {Keyboard,Alert,Image,ScrollView, View,Text,StyleSheet,TextInput, StatusBar} from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import NetInfo from '@react-native-community/netinfo';
import {createTextMessage,createImageMessage,createLocationMessage} from '../utils/MessageUtils';
import MessageList from './MessageList'

const Chat = ({navigation,route}) => {
    const usrid = route.params.id;
    const usrname = route.params.name;
    const [keyboardStatus,setKeyboardStatus] = useState(undefined);
    const [text,setText] = useState("");

    const [messages,setMessages] = useState([]);
    const testing = JSON.stringify(messages);
    const [connectStatus,setConnectStatus] = useState(null);
    const [location,setLocation] = useState(null);
    const [errorMsg,seterrorMsg] = useState(null);
    const [image,setImage] = useState(null);
    var texts = [];

    const onNetworkStateChange = (newState) => {    // newState from the NetInfo.addEventListener
        setConnectStatus(newState.isConnected);
        if(newState.isConnected){
            return null
        }else{
            Alert.alert('No Internet Connection','Please connect to Internet.',[{ text: 'Okay'}])
        }
    }
    const initialCheck = () => {            // receiving the current network state.
        NetInfo.fetch().then((state)=>{
            setConnectStatus(state.isConnected);
        })
    }

    useEffect(async ()=>{
        initialCheck();
        NetInfo.addEventListener(onNetworkStateChange); // subscribing to network status update
        // addEventListener has new state on network status change. So put this new state into connectStatus state.
        const showSubscription = Keyboard.addListener("keyboardDidShow",()=>{
            setKeyboardStatus("Keyboard Shown");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide",()=>{
            setKeyboardStatus("Keyboard Hidden");
        });    
        return ()=>{
            showSubscription.remove();
            hideSubscription.remove();
        };
    },[]);
    
    const sendLocation = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            seterrorMsg('Permission denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setMessages((prevState)=>{
            return(
                [
                    ...prevState,
                    createLocationMessage({latitude:location.coords.latitude,longitude:location.coords.longitude})
                ]
            )
        })
    }
    // const mockData = {"texts":["Hello","Hi"]};
    // let mockDataCount = 0;
    // for (let k in mockData.texts) if(mockData.texts.hasOwnProperty(k)) mockDataCount++;

    const onChangeChat = (inputText) => {
        setText(inputText)
    };

    // for (let i = 0; i < mockDataCount; i++){
    //     texts.push(
    //         <>
    //         <Text style={styles.ChatText} key={i}>
    //             {mockData.texts[i]}
    //         </Text>
    //         {mockData.location ?
    //         <MapView style={styles.map} loadingEnabled={true}
    //             region={{latitude:location.coords.latitude,longitude:location.coords.longitude,
    //             latitudeDelta:0.01,longitudeDelta:0.01
    //             }}>
    //         <Marker coordinate={{latitude:location.coords.latitude,longitude:location.coords.longitude}}
    //             title={"Title1"} />
    //         </MapView>                   
    //         : null   }     
    //         {image != null ? <Image source={{uri:image}} style={{width:250,height:200,resizeMode:"contain"}} />
    //         : null}
    //         </>
    //     )
    // };
    
    const pushText = () => {
        // const texts = createTextMessage(text);
        setMessages((prevState)=>{
            return(
                [
                    ...prevState,
                    createTextMessage(text)
                ]
            )
        })
        setText("")
        }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            aspect:[300,800],
            quality:1
        })
        console.log(result)
        if(!result.cancelled){
        setMessages((prevState)=>{
            return(
                [
                    ...prevState,
                    createImageMessage(result.uri)
                ]
            )
        })
        }
    };


    return(
        <>
            <View style={styles.ChatContainer}>
            <View style={[styles.ChatArea,keyboardStatus == "Keyboard Hidden" || keyboardStatus == undefined
             ? styles.ChatAreaDown : styles.ChatAreaUp]}>
             <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/> 
             {/* <Text>{testing}</Text> */}
                <MessageList messages={messages}/>
            </View>
            <View style={styles.TypeBar}>
                    <EvilIcons onPress={pickImage}
                     style={{marginRight:10}} name="camera" size={40} color="green" />
                    <Entypo onPress={sendLocation} style={{marginRight:20}} name="pin" size={24} color="green" />
                    <TextInput onChangeText={onChangeChat} value={text}
                    style={styles.TypeInput} placeholder="Type something!" onSubmitEditing={pushText} />
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    ChatContainer:{
        alignItems:"center",flex:1,padding:0,margin:0
    },
    ChatArea:{
        marginTop:0,borderWidth:0,width:"100%",height:"86%",
        alignItems:"flex-end",padding:4
    },
    ChatText:{
        borderWidth:0,padding:10,borderRadius:30,backgroundColor:"#38c3f5",
        color:"white",fontSize:19,marginBottom:10
    },
    ChatAreaUp:{
        height:"82%"
    },
    ChatAreaDown:{
        height:"84%"
    },
    TypeBar:{
        flexGrow:1,borderTopWidth:0.2,width:"100%",paddingLeft:12,zIndex:3,
        flexDirection:"row",alignItems:"center"
    },
    TypeInput:{
        borderWidth:0,height:40,width:270,padding:10,borderRadius:10,backgroundColor:'#f7f5f2',
    },
    map:{
    width: 200,
    height: 200,
    }
})

export default Chat;
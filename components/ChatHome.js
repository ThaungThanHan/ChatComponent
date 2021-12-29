import React, {useState,useEffect} from 'react';
import {View,Image, Text,StyleSheet,TouchableOpacity,FlatList,StatusBar} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import {fetchFriends} from '../utils/api';

const ChatHome = ({navigation}) => {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const users = fetchFriends();
        setUsers(users);
    },[]);

    const renderContact = ({item}) => {
        const {id,name,avatar} = item;

        return(
            <TouchableOpacity style={styles.chatBar} onPress={()=>navigation.navigate("Chat",{id:id,name:name})}>
                <Image source={{uri:avatar}} style={{width:100,height:60,resizeMode:"contain",borderRadius:20}} />
                <View>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{name}</Text>
                    <Text style={{fontSize:10}}>Chat preview</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // if(users){
    //     var testing = JSON.stringify(users);
    // }else{
    //     var testing = "Null"
    // }

    return(
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/> 
            <FlatList data={users} renderItem={renderContact} />
        </>
    )
}

const styles = StyleSheet.create({
    header:{
        borderWidth:1,height:50,
        flexDirection:"row",alignItems:"center",justifyContent:"space-between",
        padding:10
    },
    logo:{
        fontWeight:"bold"
    },
    chatBar:{
        borderBottomWidth:0.5,borderColor: 'rgba(158, 150, 150, .5)',
        padding:10,
        flexDirection:"row",alignItems:"center"
    },
    profileLogo:{
        marginRight:20
    }
})

export default ChatHome;
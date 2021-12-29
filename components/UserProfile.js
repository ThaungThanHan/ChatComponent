import React, {useState,useEffect} from 'react';
import {View,Image, Text,StyleSheet,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {fetchUserProfile} from '../utils/api';
import { Entypo } from '@expo/vector-icons'; 

const UserProfile = ({navigation}) => {
    const [user,setUser] = useState({
        id:null,
        name:"",
        avatar:""
});

    useEffect(()=>{
        const user = fetchUserProfile();
        setUser({
                id:user.id,
                name:user.name,
                avatar:user.avatar
        });
    },[]);

    // if(user){
    //     var testing = JSON.stringify(user);
    // }else{
    //     var testing = "null"
    // }

    return(
        <>
            <View style={styles.userCard}>
                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.id}</Text>
                </View>
                <Image source={{uri:user.avatar}} style={{width:100,height:90,resizeMode:"contain",borderRadius:20}} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header:{
        borderWidth:1,height:50,
        flexDirection:"row",alignItems:"center",justifyContent:"space-between",
        padding:12
    },
    userCard:{
        flexDirection:"row",padding:5,height:100,alignItems:"center",
        justifyContent:"space-between",borderBottomWidth:1,
    },
})



export default UserProfile;
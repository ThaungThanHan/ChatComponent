import React, {useState,useEffect} from 'react';
import {View,Image,Pressable, Text,StyleSheet,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {fetchUserProfile} from '../utils/api';
import { Entypo } from '@expo/vector-icons'; 
import {auth} from '../firebaseConfig';
import {signOut} from 'firebase/auth';
const UserProfile = ({navigation}) => {
    const [user,setUser] = useState({
        id:null,
        name:"",
        avatar:""
});

    const handleLogout = () => {
        signOut(auth).then(()=>{
            console.log("Signout successful!")
            navigation.navigate("StartPage")
        }).catch(error=>{
            console.error(error)
        })
    }
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
                    <Text>{auth.currentUser.email}</Text>
                    <TouchableOpacity onPress={handleLogout}style={styles.logoutBtn}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
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
    logoutBtn:{
        alignSelf:"center",width:100,height:40,alignItems:"center",
        justifyContent:"center",backgroundColor:"#FFE5B4",borderRadius:20
    }
})



export default UserProfile;
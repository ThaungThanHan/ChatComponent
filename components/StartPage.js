import React from 'react';
import {Text,Pressable,TouchableOpacity,View,TextInput,StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const StartPage = ({navigation}) => {
    return (
        <View style={styles.main}>
            <View style={styles.LogoContainer}>  
                <FontAwesome name="paper-plane" size={40} color="white" />
                <Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>ChatApp</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("LoginPage")} style={styles.LoginButton}>
                <Text style={{color:"white",fontWeight:"bold"}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("RegisterPage")} style={styles.RegisterButton}>
                <Text style={{color:"#42f598",fontWeight:"bold"}}>Register</Text>
            </TouchableOpacity>
            </View>
    )
};

const styles = StyleSheet.create({
    main:{
        marginTop:30,height:"100%",backgroundColor:"#42f598"
    },
    LogoContainer:{
        justifyContent:"center",alignItems:"center",
        marginTop:200
    },
    LoginButton:{
        borderWidth:1,alignItems:"center",justifyContent:"center",
        width:300,alignSelf:'center',height:40,borderRadius:20,
        marginTop:400,borderColor:"#ffffff"
    },
    RegisterButton:{
        backgroundColor:"white",alignItems:"center",justifyContent:"center",
        width:300,alignSelf:'center',height:40,borderRadius:20,
        marginTop:20,borderColor:"#ffffff"    
    }
})

export default StartPage;
import React, {useState,useEffect} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,TextInput,Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import {auth} from '../firebaseConfig';
import {signInWithEmailAndPassword } from 'firebase/auth'
const LoginPage = ({navigation}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onChangeEmail = (inputText) => {
        setEmail(inputText)
    }
    const onChangePassword = (inputText) => {
        setPassword(inputText)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{     // listener to send logged user to homepage.
            if(user){                                           // so they can't access login form
                navigation.navigate("ChatHome")
            }
        })
        return unsubscribe;
    })

    const handleLogin = async() => {
        try{
            const user = await signInWithEmailAndPassword(auth,email,password);
            console.log(user)
            navigation.navigate("ChatHome")
        }catch(error){
            console.error(error)
        }
    }

    return(
        <View style={styles.main}>
            <View style={styles.LogoContainer}>  
                <FontAwesome name="paper-plane" size={40} color="#42f598" />
                <Text style={{fontSize:20,fontWeight:"bold"}}>Login</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>EMAIL</Text>
                <TextInput onChangeText={onChangeEmail} placeholder="Enter email" style={styles.TextInput} />

                <Text style={styles.formLabel}>PASSWORD</Text>
                <TextInput onChangeText={onChangePassword} secureTextEntry placeholder="Enter password" style={styles.TextInput} />

            </View>
                <TouchableOpacity onPress={()=>navigation.navigate("ForgotPass")}>
                <Text style={{marginLeft:200,marginBottom:20,fontWeight:"bold"}}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.SignUpBtn}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Login</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    main:{
        marginTop:30,height:"100%",backgroundColor:"#FFFFFF"
    },
    LogoContainer:{
        justifyContent:"center",alignItems:"center",
        marginTop:200
    },
    formContainer:{
        justifyContent:"center",marginTop:100,
        borderWidth:0,width:250,alignSelf:'center',padding:4,
        marginBottom:10
    },
    formLabel:{
        marginLeft:1,fontWeight:"bold"
    },
    TextInput:{
        borderBottomWidth:1,borderColor:"#42f598",marginBottom:10,height:35
    },
    SignUpBtn:{
        alignSelf:"center",width:250,height:40,alignItems:"center",
        justifyContent:"center",backgroundColor:"#42f598",borderRadius:20
    }
})

export default LoginPage;
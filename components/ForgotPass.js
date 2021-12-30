import React, {useState,useEffect} from 'react';
import {Text,TextInput,TouchableOpacity,View,StyleSheet} from 'react-native'
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebaseConfig';
const ForgotPass = ({navigation}) => {
    const [email,setEmail] = useState("");

    const onChangeEmail = (inputText) =>{
        setEmail(inputText)
    }
    const handlepasswordReset = async() => {
        try{
            const reset = await sendPasswordResetEmail(auth,email);
            console.log("email sent");
            navigation.navigate("LoginPage");
        }catch(error){
            console.error(error)
        }
    }
    return(
        <View style={styles.main}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Forgot Password?</Text>
            <TextInput onChangeText={onChangeEmail}
            placeholder="Enter your email" style={styles.TextInput} />
            <TouchableOpacity onPress={handlepasswordReset} style={styles.RegisterButton}>
                <Text style={{color:"#42f598",fontWeight:"bold"}}>Reset password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        marginTop:30,height:500,width:300,backgroundColor:"#FFFFFF",borderWidth:1,
        alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:150,
        backgroundColor:"#42f598"
    },
    TextInput:{
        borderBottomWidth:1,borderColor:"#FFFFFF",marginBottom:10,height:35,
        width:200,marginTop:10,fontWeight:"bold",color:"black"
    },
    RegisterButton:{
        backgroundColor:"#FFFFFF",alignItems:"center",justifyContent:"center",
        width:200,alignSelf:'center',height:40,borderRadius:20,
        marginTop:20,borderColor:"#ffffff"
    }
})
export default ForgotPass;
import React, {useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import {auth} from '../firebaseConfig';
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { Modal} from 'react-native-paper';

const RegisterPage = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    const [modalVisible,setmodalVisible] = useState(false)

    // useEffect(()=>{
    //     const unsubscribe = auth.onAuthStateChanged(user=>{     // listener to send logged user to homepage.
    //         if(user){                                           // so they can't access login form
    //             navigation.navigate("ChatHome")
    //         }
    //     })
    //     return unsubscribe;
    // })

    const onChangeEmail = (inputText) => {
        setEmail(inputText)
    }
    const onChangePassword = (inputText) => {
        setPassword(inputText)
    }
    const onChangeConfirmPassword = (inputText) => {
        setconfirmPassword(inputText)
    }

    const handleRegister = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth,email,password);
            console.log(user)
            setmodalVisible(true)
        }catch(error){
            console.log(error.message)
        }
    }

    const LoginNow = () => {
        setmodalVisible(false)
        navigation.navigate("ChatHome")
    }
    return(
        <View style={styles.main}>
            <Modal visible={modalVisible} contentContainerStyle={styles.SuccessModal}>
                <View style={styles.successIconContainer}>
                    <AntDesign name="checkcircleo" size={100} color="white" />
                    <Text style={{fontSize:40,color:"white"}}>Success</Text>
                </View>
                <View style={styles.successActions}>
                    <Text>Congratulations!</Text>
                    <Text>Your account has been successfully registered!</Text>
                    <TouchableOpacity onPress={LoginNow} style={styles.LoginButton}>
                        <Text style={{color:"white",fontWeight:"bold"}}>Continue to chats</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.LogoContainer}>  
                <FontAwesome name="paper-plane" size={40} color="#42f598" />
                <Text style={{fontSize:20}}>Register</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>EMAIL</Text>
                <TextInput onChangeText={onChangeEmail} placeholder="Enter email" style={styles.TextInput} />

                <Text style={styles.formLabel}>PASSWORD</Text>
                <TextInput onChangeText={onChangePassword} secureTextEntry placeholder="Enter password" style={styles.TextInput} />

                <Text style={styles.formLabel}>CONFIRM PASSWORD</Text>
                <TextInput onChangeText={onChangeConfirmPassword} secureTextEntry placeholder="Enter password again"style={styles.TextInput} />
            </View>
                <TouchableOpacity onPress={handleRegister} style={styles.SignUpBtn}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Create Account</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    main:{
        marginTop:30,height:"100%",backgroundColor:"#FFFFFF",
    },
    LogoContainer:{
        justifyContent:"center",alignItems:"center",
        marginTop:200,zIndex:-1
    },
    formContainer:{
        justifyContent:"center",marginTop:80,
        borderWidth:0,width:250,alignSelf:'center',padding:4,
        marginBottom:20,zIndex:-1
    },
    formLabel:{
        marginLeft:1
    },
    TextInput:{
        borderBottomWidth:1,borderColor:"#42f598",marginBottom:10,height:35
    },
    SignUpBtn:{
        alignSelf:"center",width:250,height:40,alignItems:"center",
        justifyContent:"center",backgroundColor:"#42f598",borderRadius:20,zIndex:-1
    },
    SuccessModal:{
        backgroundColor:"white",width:350,height:500,marginTop:0,alignSelf:"center",
        zIndex:2,paddingTop:0
    },
    successIconContainer:{
        height:100,width:"100%",marginTop:0,flex:1,
        alignItems:"center",justifyContent:"center",backgroundColor:"#42f598"
    },
    successActions:{
        flex:1,height:"100%",alignItems:"center",
        justifyContent:"center",padding:3
    },
    LoginButton:{
        alignItems:"center",justifyContent:"center",
        width:300,alignSelf:'center',height:40,borderRadius:20,
        marginTop:20,backgroundColor:"#42f598"
    },
})

export default RegisterPage;
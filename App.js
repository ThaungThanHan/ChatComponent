import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Provider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import {auth} from './firebaseConfig';
import Chat from './components/Chat';
import ChatHome from './components/ChatHome';
import UserProfile from './components/UserProfile';
import StartPage from './components/StartPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage'
import ForgotPass from './components/ForgotPass'

export default function App() {
  const Stack = createStackNavigator();

  const chathomeheaderoption = ({navigation}) => ({
    title:"ChatHome",
    headerRight:()=>(
      <TouchableOpacity onPress={()=>navigation.navigate("UserProfile")}>
        <Text style={{fontSize:18,padding:10,fontWeight:"bold"}}>{auth.currentUser.email}</Text>
      </TouchableOpacity>
    )
  })

  const chatheaderoption = ({navigation,route}) => ({
    title:route.params.name,
    headerLeft:()=>(
      <Entypo name="arrow-bold-left" size={20} color="black"
      onPress={()=>navigation.navigate("ChatHome")} />
    ),
    headerShadowVisible:true,
  });
  const profileheaderoption = ({navigation,route}) => ({
    title:"User Profile",
    headerLeft:()=>(
      <Entypo name="arrow-bold-left" size={20} color="black"
      onPress={()=>navigation.navigate("ChatHome")} />
    ),gestureDirection:"horizontal"
  })
  return (
      <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:"horizontal",
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS }}>
          <Stack.Screen options={{headerShown: false}}
          name="StartPage" component={StartPage} />
          <Stack.Screen options={{headerShown: false}}
          name="RegisterPage" component={RegisterPage} />
          <Stack.Screen options={{headerShown: false}}
          name="LoginPage" component={LoginPage} />
          <Stack.Screen options={{headerShown: false}}
          name="ForgotPass" component={ForgotPass} />
          <Stack.Screen options={chathomeheaderoption}
          name="ChatHome" component={ChatHome} />
          <Stack.Screen options={chatheaderoption}
         name="Chat" component={Chat} />
          <Stack.Screen options={profileheaderoption} name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}
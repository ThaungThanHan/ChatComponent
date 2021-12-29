import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import Chat from './components/Chat';
import ChatHome from './components/ChatHome';
import UserProfile from './components/UserProfile';

export default function App() {
  const Stack = createStackNavigator();
  const chathomeheaderoption = ({navigation}) => ({
    title:"ChatHome",
    headerRight:()=>(
    <Entypo onPress={()=>navigation.navigate("UserProfile")}
    name="dots-three-vertical" size={20} color="black" />
    )
  })

  const chatheaderoption = ({navigation,route}) => ({
    title:route.params.name,
    headerLeft:()=>(
      <Entypo name="arrow-bold-left" size={20} color="black"
      onPress={()=>navigation.navigate("ChatHome")} />
    ),
    headerShadowVisible:true
  });
  const profileheaderoption = ({navigation,route}) => ({
    title:"User Profile",
    headerLeft:()=>(
      <Entypo name="arrow-bold-left" size={20} color="black"
      onPress={()=>navigation.navigate("ChatHome")} />
    )
  })
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={chathomeheaderoption}
          name="ChatHome" component={ChatHome} />
          <Stack.Screen options={chatheaderoption}
         name="Chat" component={Chat} />
          <Stack.Screen options={profileheaderoption} name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
import React, { Component, useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Login/home";
import Login from "./Login/login";
import PasswordRes from "./Login/PassWordRes";
import ChatApp from "./Chat/chatList";
import ProFile from "./profile";
import Contact from "./Contacts/contacts";
import ChatScreen from "./Chat/chatScreen";
import Resgister from "./Login/resgister";
import CreateAboutScreen from "./Chat/about";
import { firebase } from "../firebase/firebaseDB";
import "firebase/compat/auth";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MyTabs({ route }) {
  return (
    <Tab.Navigator
    //screenOptions={{ headerShown: false }}
    //  barStyle={{ backgroundColor: "#694fad" }}
    //initialRouteName="HomeTabs"
    >
      <Tab.Screen
        name="Chats"
        component={ChatApp}
        // options={{headerShown: false,
        //tapBarColor: 'bule',
        // }}
        //name="Feed"
        // component={Feed}

        options={{
          tabBarLabel: "Chats",
          tabBarColor: "red",
          tabBarStyle: {
            backgroundColor: "red",
          },

          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contact}
        //options={{headerShown: false,
        // }}

        options={{
          tabBarLabel: "Contacts",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProFile}
        //  options={{headerShown: false, }}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={25} />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingScreen}
        //  options={{headerShown: false, }}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor:'#C282D8',
          tabBarIcon: ({ color }) => (
            <Ionicons name = 'list' color={color} size={25}/>
          ),
        }}

        /> */}
    </Tab.Navigator>
  );
}

export default RootComponent = function () {
  // // // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged((u) => {
  //     if (!u) {
  //       console.log("not user");
  //     } else {
  //       //login
  //       //navigation.navigate("HomeTabs");
  //       console.log(u);

  //     }
  //   });

  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="HomeTabs"
          component={MyTabs}
          screenOptions={{ headerShown: false }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Resgister" component={Resgister} />
        <Stack.Screen name="CreateAboutScreen" component={CreateAboutScreen} />

        <Stack.Screen name="Password" component={PasswordRes} />
        {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ProFile" component={ProFile} />
          <Stack.Screen name="Setting" component={Setting} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

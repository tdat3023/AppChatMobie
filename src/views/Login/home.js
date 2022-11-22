import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

import { firebase } from "../../firebase/firebaseDB";
import "firebase/compat/auth";
import UserService from "../../services/UserService";

const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;

export default Home = ({ navigation }) => {
  // // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged((u) => {
  //     if (!u) {
  //       console.log("not user");
  //     } else {
  //       //login
  //       //navigation.navigate("HomeTabs");
  //       console.log(u);
  //       UserService.getById(u.uid).then(function (snapshot) {
  //         console.log("d" + snapshot.data().first_name);
  //         const userTemp = { uid: u.uid, ...snapshot.data() };
  //         console.log(snapshot.data());
  //         depatch(SetUset(userTemp));
  //       });
  //       navigation.navigate("HomeTabs");
  //     }
  //   });

  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);
  return (
    <SafeAreaView>
      {/* Text Zalo */}
      <View style={styles.container}>
        <View style={styles.viewZalo}>
          <Text
            style={{
              fontSize: 60,
              fontWeight: "500",
              color: "#356C90",
              alignItems: "center",
            }}>
            ZenChat
          </Text>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              navigation.navigate("Login");
            }}>
            <Text style={{ fontSize: 20, color: "white" }}> ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate("Resgister");
            }}>
            <Text style={{ fontSize: 20 }}> ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnTrans}>
          <TouchableOpacity>
            <Text style={styles.active}>Tiếng Việt</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 15 }}>English</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  active: {
    color: "#0190f3",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  viewZalo: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: "100%",
    height: "30%",
    marginTop: 20,
    marginBottom: 0.05 * WinHeight,
    alignItems: "center",
    justifyContent: "center",
  },

  btnLogin: {
    width: "70%",
    height: "25%",
    borderRadius: 100,
    backgroundColor: "blue",
    marginTop: 0.05 * WinHeight,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  btnRegister: {
    width: "70%",
    height: "25%",
    borderRadius: 100,
    backgroundColor: "white",
    marginVertical: 0.03 * WinHeight,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  btnTrans: {
    marginTop: "20%",
    width: "50%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

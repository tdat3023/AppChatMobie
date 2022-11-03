import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { firebase } from "../../firebase/firebaseDB";
import "firebase/compat/auth";
import { isValidEmail, isValidPassword } from "../../utilies/Validations";
const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;

export default Resgister = function ({ navigation, route }) {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  //states to store email/password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState();
  const data = { name: "cuong ga", age: "22" };
  const isValidationOK = () => {
    firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      isValidEmail(email) == true &&
      isValidPassword(password) == true &&
      password == retypePassword;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ alignItems: "center", marginLeft: 5, marginRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.textTop}>Tạo tài khoản</Text>
        </View>
        <View style={styles.textRemind}>
          <Text style={{ fontSize: 12 }}>
            Vui lòng nhập thông tin vào form dưới đây để đăng ký
          </Text>
        </View>
        {/* body */}
        <ScrollView style={styles.body}>
          {/* first name */}
          <View style={styles.inputText}>
            <Text style={{ fontSize: 20 }}>First Name:</Text>
            <TextInput
              onChangeText={(text) => {
                setFirstName(text);
              }}
              style={{
                color: "black",
                borderBottomWidth: 1,
              }}
              placeholder="Nguyen"
              value={firstName}
            />
          </View>

          {/* last name */}
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            <Text style={{ fontSize: 20 }}>Last Name:</Text>
            <TextInput
              onChangeText={(text) => {
                setLastName(text);
              }}
              style={{
                color: "black",
                borderBottomWidth: 1,
              }}
              placeholder="Van A"
              value={lastName}
            />
          </View>

          {/* email */}
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            <Text style={{ fontSize: 20 }}>Email:</Text>
            <TextInput
              onChangeText={(text) => {
                setErrorEmail(
                  isValidEmail(text) == true
                    ? ""
                    : "Email not in correct format"
                );
                setEmail(text);
              }}
              style={{
                color: "black",
                borderBottomWidth: 1,
              }}
              placeholder="example@gmail.com"
              value={email}
            />
            <View
              style={{
                height: 1,
                width: "100%",
                marginHorizontal: 15,
                marginBottom: 5,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                color: "red",
                fontSize: 20,
              }}>
              {errorEmail}
            </Text>
          </View>

          {/* Password */}
          <View style={{ marginHorizontal: 15 }}>
            <Text style={{ fontSize: 20 }}>Password:</Text>
            <TextInput
              onChangeText={(text) => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ""
                    : "Password must be at least 3 characters"
                );
                setPassword(text);
              }}
              style={{
                color: "black",
                borderBottomWidth: 1,
              }}
              secureTextEntry={true}
              value={password}
              placeholder="Enter your password"
            />
            <View
              style={{
                height: 1,
                width: "100%",
                marginBottom: 10,
                marginHorizontal: 15,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 20 }}>{errorPassword}</Text>
          </View>

          {/* Retype password */}
          <View style={{ marginHorizontal: 15 }}>
            <Text style={{ fontSize: 20 }}>Retype password:</Text>
            <TextInput
              onChangeText={(text) => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ""
                    : "Password must be at least 3 characters"
                );
                setRetypePassword(text);
              }}
              style={{
                color: "black",
                borderBottomWidth: 1,
              }}
              value={retypePassword}
              secureTextEntry={true}
              placeholder="Re-Enter your password"
            />
            {/* <View
              style={}
            /> */}
            <Text style={styles.textError}>{errorPassword}</Text>
          </View>
        </ScrollView>

        {/* footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={{ width: 200, fontSize: 15, color: "gray" }}>
              Tiếp tục nghĩa là bạn đồng ý với các điều khoản sử dụng Zalo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => {
              //alert(`Email = ${email}, password = ${password}`)
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(userCredential);

                  // sendEmailVerification(user).then(() => {
                  //   console.log('Email verification sent');
                  // });
                  navigation.navigate("HomeTabs", data);
                })
                .catch((error) => {
                  alert(`Cannot signin, error: ${error.message}`);
                  console.log(error);
                });
            }}>
            <AntDesign name="login" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },

  header: {
    height: 60,
    backgroundColor: "#66B2FF",
    alignItems: "center",
    flexDirection: "row",
  },

  textTop: {
    fontSize: 20,
    color: "white",
  },

  textRemind: {
    width: "100%",
    height: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 1,
    flexDirection: "column",
  },

  footer: {
    height: 60,
    marginTop: 20,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  btnRegister: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  textError: {
    color: "red",
    fontSize: 20,
    marginBottom: 5,
  },

  inputText: {
    fontWeight: 18,
    borderBottomColor: "#F9F9F9",
    marginHorizontal: 15,
    marginTop: 15,
  },
});

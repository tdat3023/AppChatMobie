import React, {Component} from 'react';
import {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import {firebase} from 'AwesomeProject/firebase/firebaseDB';
import 'firebase/compat/auth';
import {
  isValidEmail,
  isValidPassword,
} from 'AwesomeProject/utilies/Validations';
const WinWidth = Dimensions.get('window').width;
const WinHeight = Dimensions.get('window').height;

export default Resgister = function ({navigation, route}) {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //states to store email/password
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [retypePassword, setRetypePassword] = useState();
  // const isValidationOK = () => {
  //   email.length > 0 &&
  //     password.length > 0 &&
  //     isValidEmail(email) == true &&
  //     isValidPassword(password) == true &&
  //     password == retypePassword;
  // };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{alignItems: 'center', marginLeft: 5, marginRight: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.textTop}>Tạo tài khoản</Text>
        </View>
        <View style={styles.textRemind}>
          <Text style={{fontSize: 12}}>
            Vui lòng nhập email và mật khẩu để đăng ký
          </Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          {/* name */}
          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Text style={{fontSize: 20}}>Email:</Text>
            <TextInput
              onChangeText={text => {
                setEmail(name);
              }}
              style={{
                color: 'black',
                borderBottomWidth: 1,
              }}
              placeholder="Nguyen Van A"
              value={name}
            />
          </View>

          {/* email */}
          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Text style={{fontSize: 20}}>Email:</Text>
            <TextInput
              onChangeText={text => {
                setErrorEmail(
                  isValidEmail(text) == true
                    ? ''
                    : 'Email not in correct format',
                );
                setEmail(text);
              }}
              style={{
                color: 'black',
                borderBottomWidth: 1,
              }}
              placeholder="example@gmail.com"
              value={email}
            />
            <View
              style={{
                height: 1,
                width: '100%',
                marginHorizontal: 15,
                marginBottom: 5,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                marginBottom: 10,
              }}>
              {errorEmail}
            </Text>
          </View>

          {/* Password */}
          <View style={{marginHorizontal: 15}}>
            <Text style={{fontSize: 20}}>Password:</Text>
            <TextInput
              onChangeText={text => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ''
                    : 'Password must be at least 3 characters',
                );
                setPassword(text);
              }}
              style={{
                color: 'black',
                borderBottomWidth: 1,
              }}
              secureTextEntry={true}
              value={password}
              placeholder="Enter your password"
            />
            <View
              style={{
                height: 1,
                // backgroundColor: colors.primary,
                width: '100%',
                marginBottom: 10,
                marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text style={{fontSize: 20}}>{errorPassword}</Text>
          </View>

          {/* Retype password */}
          <View style={{marginHorizontal: 15}}>
            <Text style={{fontSize: 20}}>Retype password:</Text>
            <TextInput
              onChangeText={text => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ''
                    : 'Password must be at least 3 characters',
                );
                setRetypePassword(text);
              }}
              style={{
                color: 'black',
                borderBottomWidth: 1,
              }}
              value={retypePassword}
              secureTextEntry={true}
              placeholder="Re-Enter your password"
            />
            <View
              style={{
                height: 1,
                width: '100%',
                marginBottom: 10,
                marginHorizontal: 15,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 20,
                marginBottom: 5,
              }}>
              {errorPassword}
            </Text>
          </View>

          {/* otp
          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Text style={{fontSize: 20}}>Nhập mã:</Text>
            <TextInput
              onChangeText={text => {
                setEmail(name);
              }}
              style={{
                color: 'black',
                borderBottomWidth: 1,
              }}
              placeholder="1234"
              value={name}
            />
          </View> */}
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={{width: 200, fontSize: 15, color: 'gray'}}>
              Tiếp tục nghĩa là bạn đồng ý với các điều khoản sử dụng Zalo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnRegister}
            // disabled={isValidationOK() == false}
            onPress={() => {
              //alert(`Email = ${email}, password = ${password}`)
              createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                  const user = userCredential.user;
                  debugger;
                  sendEmailVerification(user).then(() => {
                    console.log('Email verification sent');
                  });
                  navigate('HomeTabs');
                })
                .catch(error => {
                  debugger;
                  alert(`Cannot signin, error: ${error.message}`);
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
    height: '100%',
    width: '100%',
  },

  header: {
    height: 60,
    backgroundColor: 'blue',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textTop: {
    fontSize: 20,
    color: 'white',
  },

  body: {
    flex: 1,
    flexDirection: 'column',
  },

  footer: {
    height: 60,
    marginTop: 20,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  btnRegister: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

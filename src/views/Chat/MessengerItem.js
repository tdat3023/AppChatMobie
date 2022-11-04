import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useRef } from "react";
import AutoHeightImage from "react-native-auto-height-image";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Contex from "../../store/Context";
import { checkUrlIsImage, checkUrlIsSticker } from "../../utilies/Validations";
import { convertDateTimeToString, handleDate } from "../../utilies/DateTime";
function MessengerItem({ messend, props, route }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [pressOn, setPressOnPin] = useState(false);
  // console.log("list t va db", messend);
  //console.log("check", useCheckFile);
  //console.log("type", messend.type);
  const onPressRenderTime = () => {
    setPressOnPin(!pressOn);
  };
  return (
    <View style={styles.viewOne}>
      <TouchableOpacity onPress={onPressRenderTime}>
        <View style={styles.chatBox}>
          <View style={styles.bodyContainer}>
            {messend.type === "NOTIFY" ||
            typeof messend.type === "undefined" ? (
              <View style={{ alignItems: "center" }}>
                <Text>{messend.content}</Text>
              </View>
            ) : user.uid != messend.userId ? (
              <View style={styles.yourMess}>
                <Image
                  style={styles.imaAvatar}
                  source={{
                    uri: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
                  }}></Image>
                <View>
                  <View
                    style={[
                      checkUrlIsImage(messend.content) ||
                      checkUrlIsSticker(messend.content)
                        ? {
                            marginLeft: 10,
                          }
                        : pressOn
                        ? {
                            padding: 10,
                            marginLeft: 10,
                            fontSize: 15,
                            borderRadius: 15,
                            //width: "60%",

                            // borderWidth: 1.5,
                            borderColor: "white",
                            backgroundColor: "gray",
                          }
                        : styles.textyourMes,

                      {
                        width: messend.content.length > 40 ? "80%" : "auto",
                      },
                    ]}>
                    <Text style={{ fontWeight: "bold" }}>
                      {idConversation.type ? (
                        userChatting.userInfo.map((user) => {
                          if (messend.userId === user.userId) {
                            return user.userFistName + " " + user.userLastName;
                          }
                        })
                      ) : (
                        <View style={{ marginTop: -10 }}></View>
                      )}
                    </Text>

                    <View>
                      {checkUrlIsImage(messend.content) ||
                      checkUrlIsSticker(messend.content) ? (
                        <AutoHeightImage
                          width={200}
                          source={{
                            uri: messend.content,
                          }}
                        />
                      ) : (
                        <Text>{messend.content}</Text>
                      )}
                    </View>
                  </View>

                  <Text style={{ marginLeft: 20, marginTop: 10 }}>
                    {pressOn ? (
                      convertDateTimeToString(
                        new Date(
                          `${messend.createdAt}`.toLocaleString("en-US", {
                            timeZone: "Asia/Ho_Chi_Minh",
                          })
                        ),
                        "HH:mm:ss"
                      )
                    ) : (
                      <View
                        style={{ marginTop: -100, marginBottom: -50 }}></View>
                    )}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.myMess}>
                {checkUrlIsImage(messend.content) ||
                checkUrlIsSticker(messend.content) ? (
                  <AutoHeightImage
                    width={200}
                    source={{
                      uri: messend.content,
                    }}
                  />
                ) : (
                  <Text
                    style={[
                      styles.textmyMes,
                      {
                        width: messend.content.length > 20 ? "60%" : "auto",
                      },
                    ]}>
                    {messend.content}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyListChat: {
    flex: 1,
    alignItems: "center",
  },

  viewOne: {
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  yourMess: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  imaAvatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: "center",
    marginLeft: 10,
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "blue",
  },

  textyourMes: [
    {
      padding: 10,
      marginLeft: 10,
      fontSize: 15,
      borderRadius: 15,
      //width: "60%",

      borderWidth: 1.5,
      borderColor: "#A0A0A0",
    },
  ],
  myMess: {
    marginRight: 10,
    // display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  textmyMes: {
    padding: 10,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 15,
    //borderWidth: 1,
    // borderColor: "blue",
    backgroundColor: "#CCCCCC",
    //color: "black",
  },

  chatBox: {
    width: "100%",
    flexDirection: "row",
    // flex: 1,
    //backgroundColor: "red",
  },
});

export default MessengerItem;

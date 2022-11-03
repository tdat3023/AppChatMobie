import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useRef } from "react";
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
import useCheckFile from "../../utilies/Validations";

function MessengerItem({ messend, props, route }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  // console.log("list t va db", messend);
  //console.log("check", useCheckFile);
  //console.log("type", messend.type);
  return (
    <View style={styles.viewOne}>
      <TouchableOpacity>
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
                      styles.textyourMes,
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

                    <Text>{messend.content}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.myMess}>
                <Text
                  style={[
                    styles.textmyMes,
                    {
                      width: messend.content.length > 20 ? "60%" : "auto",
                    },
                  ]}>
                  {messend.content}
                </Text>
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

  textyourMes: {
    padding: 10,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 10,
    width: "60%",
    borderWidth: 1,
    borderColor: "red",
  },

  myMess: {
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  textmyMes: {
    padding: 10,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: "blue",
  },

  chatBox: {
    width: "100%",
    flexDirection: "row",
    // flex: 1,
    //backgroundColor: "red",
  },
});

export default MessengerItem;

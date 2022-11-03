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
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChatScreen from "./chatScreen";
import Contex from "../../store/Context";
import {
  SetUser,
  SetIdConversation,
  SetUserChatting,
} from "../../store/Actions";

function ChatItem({ item, navigation }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const onPress = () => {
    navigation.navigate("ChatScreen", { item: item });
    depatch(SetIdConversation(item.conversations));
    depatch(SetUserChatting(item.inFo));
  };

  //console.log("lasst name", test);

  return (
    <View style={styles.viewOne}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatBox}>
          {/* ảnh đại diện */}
          <View style={styles.imaContainer}>
            <Image
              style={styles.imaAvatar}
              source={{
                uri: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
              }}></Image>
          </View>

          <View style={styles.bodyContainer}>
            {/* tên */}
            <Text style={styles.textName}>{item.inFo.name}</Text>
            <Text style={styles.textLastMes}>
              {item.conversations?.lastMessage[0].content.endsWith(
                "Đã rời khỏi nhóm"
              ) ||
              item.conversations?.lastMessage[0].content.endsWith("khỏi nhóm")
                ? ""
                : item.conversations?.lastMessage[0]?.userId === user.uid
                ? "Bạn: "
                : item.inFo?.userInfo?.map((u) => {
                    if (
                      item.conversations?.lastMessage[0]?.userId === u?.userId
                    ) {
                      console.log(u);
                      return u?.userFistName + " " + u?.userLastName + ": ";
                    }
                  })}

              {item.conversations.lastMessage.map((x) => {
                return x.content;
              })}
            </Text>
          </View>

          <View style={styles.notification}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            {item.conversations.mb.numberUnread > 0 && (
              <View
                style={styles.textNoti}
                // style={[
                //   styles.textNoti,
                //   {
                //     paddingHorizontal: item.numberOfUnReadMess > 9 ? 5 : 10,
                //   },
                // ]}
              >
                <Text>{item.conversations.mb.numberUnread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  notification: {
    width: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },

  bodyListChat: {
    flex: 1,
    alignItems: "center",
  },

  viewOne: {
    display: "flex",
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  imaContainer: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  imaAvatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 0.2,
  },

  textName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "blod",
    color: "black",
  },

  textLastMes: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15,
    //color: "red",
  },

  chatBox: {
    width: "100%",
    height: 90,
    flexDirection: "row",
  },

  textNoti: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 20,
    borderRadius: 10,
  },
});

export default ChatItem;

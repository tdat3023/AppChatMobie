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
  ImageEditor,
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
import { checkUrlIsImage, checkUrlIsSticker } from "../../utilies/Validations";

function ChatGroupItem({ item, navigation }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const onPress = () => {
    navigation.navigate("ChatScreen", { item: item });
    depatch(SetIdConversation(item.conversations));
    depatch(SetUserChatting(item.inFo));
  };

  //console.log("lasst name", test);

  function renderImaAvatar() {
    if (item.inFo.avatar.length == 1) {
      return (
        <Image
          style={styles.imaAvatarOne}
          source={{
            uri: item.inFo.avatar[0],
          }}
        ></Image>
      );
    }

    return (
      <View style={styles.imaGroupAvata}>
        <View style={styles.imaGroup}>
          <Image
            style={styles.imaAvatar}
            source={{
              uri: item.inFo.avatar[0].avaUser
                ? item.inFo.avatar[0].avaUser
                : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
            }}
          ></Image>
          <Image
            style={styles.imaAvatar}
            source={{
              uri: item.inFo.avatar[1].avaUser
                ? item.inFo.avatar[1].avaUser
                : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
            }}
          ></Image>
        </View>
        <View style={styles.imaGroup}>
          <Image
            style={styles.imaAvatar}
            source={{
              uri:
                item.inFo.avatar.length > 3
                  ? item.inFo.avatar[2].avaUser
                  : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
            }}
          ></Image>

          {item.inFo.avatar.length == 3 && null}

          {item.inFo.avatar.length == 4 && (
            <Image
              style={styles.imaAvatar}
              source={{
                uri: item.inFo.avatar[3].avaUser
                  ? item.inFo.avatar[3].avaUser
                  : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
              }}
            ></Image>
          )}

          {item.inFo.avatar.length > 4 && (
            <View style={styles.imaAvatar}>
              <Text style={styles.numberOfMember}>3</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.viewOne}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatBox}>
          {/* ảnh đại diện */}
          <View style={styles.imaContainer}>{renderImaAvatar()}</View>

          <View style={styles.bodyContainer}>
            {/* tên */}
            <Text style={styles.textName}>{item.inFo.name}</Text>
            <Text style={styles.textLastMes}>
              {item.conversations?.lastMessage[0].type.endsWith("NOTIFY")
                ? ""
                : item.conversations?.lastMessage[0]?.userId === user.uid
                ? "Bạn: "
                : item.inFo?.userInfo?.map((u) => {
                    if (
                      item.conversations?.lastMessage[0]?.userId === u?.userId
                    ) {
                      //console.log(u);
                      return u?.userFistName + " " + u?.userLastName + ": ";
                    }
                  })}

              {checkUrlIsImage(item.conversations.lastMessage[0].content)
                ? "[Image]"
                : checkUrlIsSticker(item.conversations.lastMessage[0].content)
                ? "[Sticker]"
                : item.conversations.lastMessage.map((x) => {
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
    borderBottomWidth: 0.8,
  },

  viewOne: {
    display: "flex",
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  imaGroupAvata: {
    height: 70,
    width: 70,
    flexDirection: "row",
    padding: 10,
    paddingTop: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  imaContainer: {
    flexDirection: "row",
    width: 70,
    height: 30,
    paddingLeft: 10,
    paddingTop: 13,
  },

  imaAvatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },

  imaAvatarOne: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "red",
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 0.8,
    marginLeft: 10,
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

export default ChatGroupItem;

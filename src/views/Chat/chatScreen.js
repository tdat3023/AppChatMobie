import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MessengerItem from "./MessengerItem";
import CreateAboutScreen from "./about.js";
import Contex from "../../store/Context";
import messageApi from "../../api/messageApi";

export default ChatScreen = ({ props, navigation, route }) => {
  // const {item} = route.params;
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [listMessgae, setListMessage] = useState([]);
  React.useEffect(() => {
    const fetchMessages = async () => {
      // console.log("user:", user.user.uid);
      try {
        // user.uid,page,size
        const response = await messageApi.getMess(idConversation, user, 0, 20);
        const { data, page, size, totalPages } = response;
        console.log("listMess ", data[0].messages);
        if (response) {
          setListMessage(data[0].messages);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchMessages();
  }, [listMessgae]);

  // console.log(item);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Top tag */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{ alignItems: "center", marginLeft: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.nameFriend}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {userChatting.firstName + " " + userChatting.lastName}
            </Text>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignItems: "center", marginLeft: 10 }}
              onPress={() => {
                navigation.navigate("CreateAboutScreen");
              }}>
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyListChat}>
            <FlatList
              style={styles.bodyList}
              data={listMessgae}
              renderItem={({ item }) => (
                <MessengerItem messend={item}></MessengerItem>
              )}
              //</View>key={"&{item.}timestamp"}
            ></FlatList>
          </View>
        </View>

        {/*Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.moreAction}>
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.nameFriend}>
            <TextInput
              style={styles.textChat}
              placeholder="Tin nhắn"></TextInput>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="mic" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="image" size={27} color="black" />
            </TouchableOpacity>
          </View>
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

  headerContainer: {
    height: 60,
    backgroundColor: "#66B2FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  bodyContainer: {
    flex: 1,
    // backgroundColor: "red",
  },

  footerContainer: {
    height: 60,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
  },

  nameFriend: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
  },

  moreTag: {
    marginLeft: 25,
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  moreAction: {
    marginLeft: 10,
  },

  textChat: {
    height: 50,
    width: "120%",
  },

  bodyListChat: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  bodyList: {
    width: "100%",
  },
});

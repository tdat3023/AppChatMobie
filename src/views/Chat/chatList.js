import React from "react";

import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import axios from "axios";
import io from "socket.io-client";

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChatItem from "./chatItem";
import ChatGroupItem from "./chatGroupItem";

import conversationApi from "../../api/conversationApi";
import Contex from "../../store/Context";

import { SetUser } from "../../store/Actions";

export default ChatApp = function ({ navigation }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [conversations, setConversations] = useState([]);
  const socket = React.useRef();
  // console.log("user:", user.user.uid);
  // console.log(typeof conversationApi);
  useEffect(() => {
    // setA("b");
    if (user) {
      socket.current = io("https://13.228.206.211");
      // socket.current = io("http://localhost:5005");
      // console.log(socket);
      socket.current.emit("start", user);

      //console.log("dau buoi");
      //socket.current.emit("start", user);
    }
  }, [user]);
  useEffect(() => {
    // setA("b");
    if (socket.current) {
      // console.log(conversations);
      const ids = conversations?.map((ele) => ele.conversations._id);
      socket.current.emit("join-conversations", ids);
    }
  }, [user, conversations]);
  // console.log("socket", user);
  React.useEffect(() => {
    // //get api set list conversation
    // //fetch product in wishlist

    // depatch(SetUser("HiIaKOEh8qTzOfTF1Va0Z6z61Qz2"));
    const fetchConversations = async () => {
      // console.log("user:", user.user.uid);
      try {
        // user.uid,page,size
        const response = await conversationApi.getConversations(
          user.uid,
          0,
          200
        );
        const { data, page, size, totalPages } = response;
        //console.log("data", data);
        if (response) {
          setConversations(data);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchConversations();
  }, [conversations]);

  //  check type conversation ? render groupChatItem : render ChatItem
  const renderItem = ({ item }) => {
    if (item.conversations.type) {
      // console.log("type", con.conversations.type);
      return (
        <ChatGroupItem item={item} navigation={navigation} socket={socket} />
      );
    } else {
      return (
        <ChatItem
          item={item}
          navigation={navigation}
          socket={socket}></ChatItem>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* button back */}
        <View style={styles.topTag}>
          <TouchableOpacity
            style={{ alignItems: "center", marginLeft: 10 }}
            // onPress={() => {
            //   // navigation.goBack();
            //   console.log(users);
            // }}
          >
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
          {/* sreach */}
          <View style={styles.sreach}>
            <TextInput
              style={styles.textTopTag}
              placeholder="Tìm kiếm"
              placeholderTextColor="white"></TextInput>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                style={{ marginLeft: 15, marginRight: 5 }}
                name="add-sharp"
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* classìy */}
        <View style={styles.topTagMenu}>
          <View>
            <TouchableOpacity>
              <Text style={styles.text1}>TIN NHẮN</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.text1}>TIN CHỜ</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* List chat */}
        <View style={styles.bodyListChat}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            style={styles.bodyList}
            data={conversations}
            renderItem={renderItem}
            // keyExtractor={(item) => item.conversations._id}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },

  sreach: {
    marginLeft: 10,
    width: "60%",
  },

  moreTag: {
    marginLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  notification: {
    paddingRight: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  topTag: {
    width: "100%",
    height: 50,
    backgroundColor: "#66B2FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  textTopTag: {
    fontSize: 20,
  },

  bodyListChat: {
    width: "100%",
    alignItems: "center",
  },

  topTagMenu: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  viewOne: {
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  imaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
  },

  textName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  textLastMes: {
    marginLeft: 10,
    fontSize: 15,
  },

  chatBox: {
    width: "100%",
    height: 90,
    flexDirection: "row",
  },

  textNoti: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: 25,
    borderRadius: 10,
  },

  bodyList: {
    width: "100%",
  },
  text1: {
    fontSize: 20,
  },
});

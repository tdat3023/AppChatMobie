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
import ChatItem from "./chatItem";
import ChatScreen from "./chatScreen";
// import "../../api/conversationApi";
import Contex from "AwesomeProject/store/Context";

const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;

export default ChatApp = function ({ navigation }) {
  // const [users, setUsers] = useState([
  //   {
  //     id: "1",
  //     url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
  //     name: "Tiến Đạt",
  //     lastMessage: "Hello",
  //     numberOfUnReadMess: "20",
  //   },
  //   {
  //     id: "5",
  //     url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
  //     name: "Tiến",
  //     lastMessage: "Goodbye",
  //     numberOfUnReadMess: "1",
  //   },
  //   {
  //     id: "3",
  //     url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
  //     name: "Test1",
  //     lastMessage: "He",
  //     numberOfUnReadMess: "0",
  //   },
  //   {
  //     id: "4",
  //     url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
  //     name: "2001",
  //     lastMessage: "báo nhà",
  //     numberOfUnReadMess: "1",
  //   },
  // ]);'
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [conversations, setConversations] = useState([]);
  // React.useEffect(() => {
  //   //get api set list conversation
  //   //fetch product in wishlist
  //   const fetchConversations = async () => {
  //     try {
  //       const response = await conversationApi.getConversations(user.uid);

  //       const { data, page, size, totalPages } = response;
  //       console.log(data);
  //       if (response) {
  //         setConversations(data);
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch conversation list: ", error);
  //     }
  //   };

  //   fetchConversations();
  // }, [user]);

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
              placeholderTextColor="white"
            ></TextInput>
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
          {/* <FlatList
            style={styles.bodyList}
            data={users}
            renderItem={({ item }) => (
              <ChatItem item={item} navigation={navigation}></ChatItem>
            )}
            keyExtractor={(item) => item.id}
          ></FlatList> */}
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

  imaAvatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
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

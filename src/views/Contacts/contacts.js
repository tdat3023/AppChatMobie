import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Text,
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
import Feather from "react-native-vector-icons/Feather";
import FriendItem from "./FriendItem";
import FriendRequest from "./friendRequest";
import friendApi from "../../api/friendApi";
import Contex from "../../store/Context";

const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;
const Friend = "Friend";
const Request = "Request";

const Contact = ({ navigation }) => {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting, socket } = state;

  const [listFriend, setListFirend] = useState([]);

  const [listInvite, setListInvite] = useState([]);

  const [Refreshing, setRefreshing] = useState(false);

  //console.log("socket", socket);
  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, { key: 100, item: "Item100" }]);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const [typing, setTyping] = useState(Friend);
  React.useEffect(() => {
    const fetchListRequest = async () => {
      // console.log("user:", user.user.uid);
      try {
        // user.uid,page,size
        const response = await friendApi.getListInvite(user.uid);
        const data = response;
        // console.log("listMess ", data[0].messages);
        if (response) {
          setListInvite(data);
          // console.log("listMess", data);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };
    const fetchListFriend = async () => {
      // console.log("user:", user.user.uid);
      try {
        // user.uid,page,size
        const response = await friendApi.getListFriend(user.uid);
        const data = response;
        // console.log("listMess ", data[0].messages);
        if (response) {
          setListFirend(data);
          // console.log("listMess", data);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchListRequest();
    fetchListFriend();
  }, [listInvite, listFriend]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* button back */}
        <View style={styles.topTag}>
          <TouchableOpacity style={{ alignItems: "center", marginLeft: 10 }}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.sreach}>
            <TextInput
              style={styles.textTopTag}
              placeholder="Tìm kiếm"
              placeholderTextColor="white"></TextInput>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Ionicons name="person-add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* tagTop */}
        <View style={styles.topTagMenu}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTyping(Friend);
              }}>
              {typing === Friend ? (
                <Text style={styles.text2}>BẠN BÈ</Text>
              ) : (
                <Text style={styles.text1}>BẠN BÈ</Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTyping(Request);
              }}>
              {typing === Request ? (
                <Text style={styles.text2}>LỜI MỜI</Text>
              ) : (
                <Text style={styles.text1}>LỜI MỜI</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        {typing === Friend ? (
          <View style={styles.bodyListChat}>
            <FlatList
              style={styles.bodyList}
              data={listFriend}
              renderItem={({ item }) => <FriendItem item={item} />}
              // keyExtractor={(item) => item.id}
            ></FlatList>
          </View>
        ) : (
          <View style={styles.bodyListChat}>
            <FlatList
              style={styles.bodyList}
              data={listInvite}
              renderItem={({ item }) => (
                // <FriendItem item={item} />
                <FriendRequest item={item} />
              )}
              // keyExtractor={(item) => item.id}
            ></FlatList>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  sreach: {
    marginLeft: 10,
    width: 280,
  },

  moreTag: {
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "space-between",
    flexDirection: "row",
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

  topTagMenu: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  text1: {
    fontSize: 20,
  },

  text2: {
    fontSize: 20,
    color: "blue",
  },
});

export default Contact;

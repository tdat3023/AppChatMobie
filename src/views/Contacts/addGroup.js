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

const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;

const AddFriend = ({ navigation }) => {
  const [users, setUsers] = useState([
    {
      id: "1",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
  ]);

  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, { key: 100, item: "Item100" }]);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const [typing, setTyping] = useState(false);

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
              placeholderTextColor="white"
            ></TextInput>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Ionicons name="person-add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}

        <View style={styles.bodyListChat}>
          <FlatList
            style={styles.bodyList}
            data={users}
            renderItem={({ item }) => (
              <View style={styles.viewOne}>
                <View style={styles.chatBox}>
                  {/* ảnh đại diện */}
                  <View style={styles.imaContainer}>
                    <Image
                      style={styles.imaAvatar}
                      source={{ uri: item.url }}
                    ></Image>
                    <View style={styles.status}></View>
                  </View>

                  <View style={styles.bodyContainer}>
                    {/* tên */}
                    <Text style={styles.textName}>Ten o day</Text>
                  </View>

                  <View style={styles.notification}>
                    <TouchableOpacity
                      onPress={() => {
                        setTyping(!typing);
                      }}
                    >
                      {typing ? (
                        <Ionicons name="checkbox" size={24} color="black" />
                      ) : (
                        <Ionicons
                          name="checkbox-outline"
                          size={24}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            // keyExtractor={(item) => item.id}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "yellow",
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

  viewOne: {
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  chatBox: {
    width: "100%",
    height: 90,
    flexDirection: "row",
  },

  imaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  imaAvatar: {
    marginLeft: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "red",
  },

  bodyContainer: {
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    height: 90,
    borderBottomWidth: 1,
    justifyContent: "center",
  },

  notification: {
    width: "20%",
    paddingRight: 13,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
    borderBottomWidth: 1,
  },

  textName: {
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  status: {
    position: "absolute",
    top: 65,
    left: 55,
    backgroundColor: "green",
    height: 10,
    width: 10,
    borderRadius: 10,
  },
});

export default AddFriend;

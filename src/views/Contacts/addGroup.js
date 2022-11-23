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
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AddGroupItem from "./addGroupItem";

const WinWidth = Dimensions.get("window").width;
const WinHeight = Dimensions.get("window").height;

const AddGroup = ({ navigation }) => {
  const [users, setUsers] = useState([
    {
      id: "1",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "2",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "3",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "4",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "5",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "6",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "7",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "8",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
    {
      id: "9",
      url: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
      name: "Tiến Đạt",
      lastMessage: "Hello",
    },
  ]);

  const [count, setCount] = useState(0);

  console.log(count);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* button back */}

        <View style={styles.topTag}>
          <TouchableOpacity style={{ alignItems: "center", marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={30} color="gray" />
          </TouchableOpacity>
          <View style={styles.topTag1}>
            <Text style={{ fontSize: 20 }}>Nhóm mới</Text>
            <Text>
              Đã chọn:
              <Text> {count} </Text>
            </Text>
          </View>
        </View>

        {/* tên nhóm */}
        <View style={{ alignItems: "center" }}>
          <View style={styles.topTag0}>
            <TouchableOpacity style={{ alignItems: "center", marginLeft: 10 }}>
              <AntDesign name="camera" size={28} color="gray" />
            </TouchableOpacity>
            <View style={styles.sreach}>
              <TextInput
                style={styles.textTopTag}
                placeholder="Đặt tên nhóm"
                placeholderTextColor="gray"
              ></TextInput>
            </View>
          </View>

          {/* sreach */}
          <View style={styles.topTag2}>
            <TouchableOpacity style={{ alignItems: "center", marginLeft: 10 }}>
              <AntDesign name="search1" size={24} color="gray" />
            </TouchableOpacity>
            <View style={styles.sreach}>
              <TextInput
                style={styles.textTopTag}
                placeholder="Tìm kiếm"
                placeholderTextColor="gray"
              ></TextInput>
            </View>
          </View>
        </View>

        {/* List */}
        <View style={styles.bodyListChat}>
          <FlatList
            style={styles.bodyList}
            data={users}
            renderItem={({ item }) => (
              <AddGroupItem item={item} setCount={setCount} count={count} />
            )}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </View>

        <View style={styles.footer}>
          <View style={styles.listChoose}>
            <FlatList
              horizontal
              // style={{ justifyContent: "center" }}
              data={users}
              renderItem={({ item }) => (
                <View style={styles.itemChoose}>
                  <Image
                    style={styles.imaAvatar}
                    source={{ uri: item.url }}
                  ></Image>

                  <View style={styles.status}>
                    <TouchableOpacity>
                      <AntDesign name="close" size={14} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            ></FlatList>
          </View>
          <View style={styles.viewbtn}>
            <TouchableOpacity style={styles.btn}>
              <Feather name="arrow-right" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // flex: 1,
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
    height: 55,
    backgroundColor: "#66B2FF",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  topTag0: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  topTag2: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D6E4E5",
    borderRadius: 10,
  },

  topTag1: {
    marginLeft: 10,
    flexDirection: "column",
  },

  textTopTag: {
    fontSize: 20,
  },

  text1: {
    fontSize: 20,
  },

  text2: {
    fontSize: 20,
    color: "blue",
  },

  bodyListChat: {
    flex: 1,
  },

  footer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
  },

  btn: {
    marginRight: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#66B2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  imaAvatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "red",
  },

  listChoose: {
    flex: 1,
    justifyContent: "center",
    marginTop: 5,
    marginHorizontal: 10,
    backgroundColor: "yellow",
  },

  itemChoose: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 10,
  },

  status: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 15,
    width: 15,
    backgroundColor: "gray",
    borderRadius: 20,
  },
});

export default AddGroup;

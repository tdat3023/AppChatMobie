import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

export default function FriendItem(item) {
  return (
    <View style={styles.viewOne}>
      <TouchableOpacity>
        <View style={styles.chatBox}>
          {/* ảnh đại diện */}
          <View style={styles.imaContainer}>
            <Image style={styles.imaAvatar} source={{ uri: item.url }}></Image>
            <View style={styles.status}></View>
          </View>

          <View style={styles.bodyContainer}>
            {/* tên */}
            <Text style={styles.textName}>Ten o day</Text>
          </View>

          <View style={styles.notification}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Ionicons name="videocam-outline" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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

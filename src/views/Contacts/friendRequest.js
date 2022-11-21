import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import React from "react";

export default function FriendRequest(item) {
  return (
    <View style={styles.viewOne}>
      {/* ảnh đại diện */}
      <View style={styles.imaContainer}>
        <Image style={styles.imaAvatar} source={{ uri: item.url }}></Image>
      </View>

      {/* Thông tin */}
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          {/* tên */}
          <Text style={styles.textName}>Nguyễn Tiến Đạt</Text>
          <Text style={styles.textDate}>21/10</Text>
        </View>

        {/* lời nhắn */}
        <View style={styles.bodyContainer}>
          <Text style={styles.text}>
            Xin chào, mình là Nguyễn Tiến Đạt. Kết bạn với mình nhé!
          </Text>
        </View>

        {/* nút */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#CCCCCC" }]}
          >
            <Text>TỪ CHỐI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#66B2FF" }]}
          >
            <Text>ĐỒNG Ý</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewOne: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
  },

  imaAvatar: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "red",
  },

  infoContainer: {},

  textName: {
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  textDate: {
    paddingLeft: 15,
  },

  headerContainer: {
    marginTop: 13,
    marginBottom: 5,
  },

  bodyContainer: {
    width: 320,
    marginBottom: 10,
  },

  text: {
    width: 290,
    height: 60,
    marginLeft: 13,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  btn: {
    paddingVertical: 8,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

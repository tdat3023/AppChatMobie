import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { useState, useEffect, useRef } from "react";

export default function AddGroupItem({ item, setCount, count }) {
  const [typing, setTyping] = useState(false);

  return (
    <View style={styles.viewOne}>
      <View style={styles.chatBox}>
        {/* ảnh đại diện */}
        <View style={styles.imaContainer}>
          <Image style={styles.imaAvatar} source={{ uri: item.url }}></Image>
          {/* <View style={styles.status}></View> */}
        </View>

        <View style={styles.bodyContainer}>
          {/* tên */}
          <Text style={styles.textName}>Ten o day</Text>
        </View>

        <View style={styles.notification}>
          <TouchableOpacity
            onPress={() => {
              if (typing) {
                setCount(count - 1);
              } else {
                setCount(count + 1);
              }
              setTyping(!typing);
            }}
          >
            {typing ? (
              <Ionicons name="checkbox" size={24} color="black" />
            ) : (
              <Ionicons name="checkbox-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
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
    marginLeft: 35,
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
    justifyContent: "center",
  },

  notification: {
    width: "20%",
    paddingRight: 13,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
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

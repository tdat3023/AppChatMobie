import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import React from "react";
import friendApi from "../../api/friendApi";
import Contex from "../../store/Context";

export default function FriendRequest({ item }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting, socket } = state;

  const handDeleteInvite = async () => {
    try {
      await friendApi
        .deleteInvite(user.uid, item.inviteId)
        .then(console.log("delete ok"));
      console.log("idinvite", item.inviteId);
    } catch (error) {
      console.log("errors");
    }
    if (socket) {
      if (socket.current) {
        socket.current.emit("handle-request-friend", {
          idUser: user.uid,
          idFriend: item.inviteId,
          idCon: idConversation._id,
        });
        console.log("friend request");
      }
    }
  };
  const handAceptFriend = async () => {
    console.log("handAceptFriend");
    try {
      const { conversationId } = await friendApi.acceptFriend(
        user.uid,
        item.inviteId
      );
      console.log("acceptFriend", conversationId);
      //console.log("idinvite", item.inviteId);
    } catch (error) {
      console.log("errors acceptFriend");
    }
  };

  //console.log("item", item);
  return (
    <View style={styles.viewOne}>
      {/* ảnh đại diện */}
      <View style={styles.imaContainer}>
        {item.avaUser == "" ? (
          <Image
            style={styles.imaAvatar}
            source={{
              uri: "https://www.sightseeingtoursitaly.com/wp-content/uploads/2019/06/Famous-Italian-dishes.jpg",
            }}></Image>
        ) : (
          <Image
            style={styles.imaAvatar}
            source={{
              uri: item.avaUser,
            }}></Image>
        )}
      </View>

      {/* Thông tin */}
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          {/* tên */}
          <Text style={styles.textName}>
            {item.userFistName} {item.userLastName}
          </Text>
          <View
            style={[
              styles.viewGroupCommon,
              { justifyContent: "space-evenly" },
            ]}>
            <View style={styles.viewGroupCommon}>
              <View style={styles.viewDot}></View>
              <Text style={styles.textDate}>Nhom chung: </Text>
              <Text style={styles.textDate}>{item.numCommonGroup}</Text>
            </View>

            <View style={styles.viewGroupCommon}>
              <View style={styles.viewDot}></View>
              <Text style={styles.textDate}>Ban chung: </Text>
              <Text style={styles.textDate}>{item.numCommonFriend}</Text>
            </View>
          </View>
        </View>

        {/* lời nhắn */}
        {/* <View style={styles.bodyContainer}>
          <Text style={styles.text}>
            Xin chào, mình là Nguyễn Tiến Đạt. Kết bạn với mình nhé!
          </Text>
        </View> */}

        {/* nút */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={handDeleteInvite}
            style={[styles.btn, { backgroundColor: "#CCCCCC" }]}>
            <Text>TỪ CHỐI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handAceptFriend}
            style={[styles.btn, { backgroundColor: "#66B2FF" }]}>
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
    borderBottomWidth: 0.2,
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
    paddingLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
  },

  textDate: {
    //paddingLeft: 15,
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
    justifyContent: "space-around",
    marginBottom: 10,
  },

  btn: {
    paddingVertical: 8,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  viewDot: {
    height: 7,
    width: 7,
    borderRadius: 100,
    backgroundColor: "gray",
    marginRight: 10,
  },
  viewGroupCommon: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },
});

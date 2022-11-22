import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import {
  SetUser,
  SetIdConversation,
  SetUserChatting,
} from "../../store/Actions";
import Contex from "../../store/Context";
import { checkUrlIsImage, checkUrlIsSticker } from "../../utilies/Validations";
// import { convertDateTimeToString, handleDate } from "../../utilies/DateTime";

function ChatItem({ item, navigation }) {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const onPress = () => {
    navigation.navigate("ChatScreen"), { item: item };

    // type conversation is false set conversation= conversation, chatUser= userInfo
    depatch(SetIdConversation(item.conversations));
    depatch(SetUserChatting(item.inFo));
  };

  const content = item.conversations.lastMessage.map((x) => {
    return x;
  });
  const test = { ...content };

  const handleChangText = (text) => {
    if (text.length > 0) {
      setTyping(true);
    } else if (text.length === 0) {
      setTyping(false);
    }
    setNewMess(text);
  };

  // console.log("image", item.inFo);

  return (
    <View style={styles.viewOne}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.chatBox}>
          {/* ảnh đại diện */}
          <View style={styles.imaContainer}>
            {/* {item.conversations} */}
            <Image
              style={styles.imaAvatar}
              source={{
                uri:
                  item.inFo.avatar.length > 0
                    ? item.inFo.avatar
                    : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
              }}
            ></Image>
          </View>

          <View style={styles.bodyContainer}>
            {/* tên */}
            <Text style={styles.textName}>
              {item.inFo.firstName + " " + item.inFo.lastName}
            </Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.textLastMes}>
                {/* check lastmess is image , sticker ? render lastmess [image, sticker], check length >10 ? .... */}
                {item.conversations?.lastMessage[0].type === "NOTIFY" ||
                typeof item.conversations?.lastMessage[0].type === "undefined"
                  ? item.conversations?.lastMessage[0].content
                  : checkUrlIsImage(item.conversations.lastMessage[0].content)
                  ? "[Image]"
                  : checkUrlIsSticker(item.conversations.lastMessage[0].content)
                  ? "[Sticker]"
                  : item.conversations.lastMessage[0].content.length > 15
                  ? item.conversations.lastMessage[0].content.slice(0, 20) +
                    " ..."
                  : item.conversations.lastMessage.map((x) => {
                      return x.content;
                    })}
              </Text>
              <Text style={styles.textLastMes}>
                {/* {handleDate(
                  new Date(),
                  new Date(
                    `${item.conversations.lastMessage[0].updatedAt}`.toLocaleString(
                      "en-US",
                      { timeZone: "Asia/Ho_Chi_Minh" }
                    )
                  )
                )} */}
              </Text>
            </View>
          </View>

          <View style={styles.notification}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            {item.conversations.mb.numberUnread > 0 && (
              <View style={styles.textNoti}>
                <Text>{item.conversations.mb.numberUnread}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imaContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  notification: {
    width: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },

  bodyListChat: {
    flex: 1,
    alignItems: "center",
  },

  viewOne: {
    display: "flex",
    width: "100%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  imaContainer: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  imaAvatar: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "yellow",
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 0.2,
  },

  textName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "blod",
    color: "black",
  },

  textLastMes: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 15,
    //color: "red",
  },

  chatBox: {
    width: "100%",
    height: 90,
    flexDirection: "row",
  },

  textNoti: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 20,
    borderRadius: 10,
  },
});

export default ChatItem;

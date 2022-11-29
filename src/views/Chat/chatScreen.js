import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MessengerItem from "./MessengerItem";
import CreateAboutScreen from "./about.js";
import AboutGroupScreen from "./aboutGroup";
import Contex from "../../store/Context";
import messageApi from "../../api/messageApi";
import { Dimensions } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import ImagePicker from "react-native-image-picker";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import socket from "../../socket/socketClient";
import { el } from "date-fns/locale";

export default ChatScreen = ({ props, navigation, route }) => {
  // const [panigation, setPanigation] = React.useState({ page: 0, size: 50 });
  // const [page, setPage] = React.useState(0);

  // const scrollToBottom = () => {
  //   // messagesEnd.current.scrollToEnd({ animated: true });
  // };

  const socket = route?.params;

  const [onFocus, setOnFocus] = useState(false);
  // const {item} = route.params;
  const [typing, setTyping] = useState(false);

  const { state, depatch } = React.useContext(Contex);
  const { user, idConversation, userChatting } = state;
  const [listMessgae, setListMessage] = useState([]);
  // if (socket) {
  //   console.log("socket", socket);
  // }
  const onFoucsInPut = () => {
    setOnFocus(!onFocus);
  };
  const onDismiss = () => {
    Keyboard.dismiss;
    setOnFocus(!onFocus);
  };

  // useEffect(() => {
  //   //scroll last message
  //   scrollToBottom();
  // });

  const [newMess, setNewMess] = useState("");
  //console.log(listMessgae);
  //console.log("id", user.uid);
  React.useEffect(() => {
    const fetchMessages = async () => {
      // console.log("user:", user.user.uid);
      try {
        // user.uid,page,size
        const response = await messageApi.getMess(
          idConversation._id,
          user.uid,
          0,
          200
        );
        const { data, page, size, totalPages } = response;
        // console.log("listMess ", data[0].messages);
        if (response) {
          setListMessage(data[0].messages);
          //  console.log("listMess", data[0].messages);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchMessages();
  }, [userChatting]);

  useEffect(() => {
    socket.current?.emit("join-room", {
      idCon: idConversation._id,
      // isNew:false
    });

    socket.current?.on("get-message", ({ senderId, message }) => {
      //console.log("get");
      if (senderId === user.uid) {
        console.log("send nhung k them vao list ---> ");
      } else {
        console.log("mess nhan dc ---> ");

        // console.log(message);
        setListMessage((prev) => [...prev, { ...message }]);
      }
    });
  }, []);

  const handSendMess = async () => {
    //create new message
    const newMessSend = {
      userId: user.uid,
      content: newMess,
      conversationId: idConversation._id,
      type: "TEXT",
    };
    console.log(newMessSend);
    setNewMess("");
    const messSave = await messageApi.addTextMess(newMessSend);

    //  console.log("mess send", messSave);

    setListMessage((prev) => [...prev, { ...messSave }]);

    //call soket in here

    if (socket) {
      if (socket.current) {
        socket.current.emit("send-message", {
          senderId: user.uid,
          receiverId: userChatting.userIdFriend,
          message: messSave,
          idCon: idConversation._id,
        });
        // console.log("sender", user.uid);
        // console.log("rec", userChatting.userIdFriend);
      }
      console.log("send");
    }
  };
  // if (socket) {
  //   console.log("socket connected", socket);
  // }

  // UI send mes
  const handleChangText = (text) => {
    if (text.length > 0) {
      setTyping(true);
    } else if (text.length === 0) {
      setTyping(false);
    }
    setNewMess(text);
  };

  // UI send image
  // Open choose Image
  const [filePath, setFilePath] = useState({});
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      console.log("base64 -> ", response.base64);
      console.log("uri -> ", response.uri);
      console.log("width -> ", response.width);
      console.log("height -> ", response.height);
      console.log("fileSize -> ", response.fileSize);
      console.log("type -> ", response.type);
      console.log("fileName -> ", response.fileName);
      setFilePath(response);
    });
  };

  // trang mở rộng
  const aboutScreen = () => {
    if (idConversation.type) {
      // console.log("type", con.conversations.type);
      return navigation.navigate("AboutGroupScreen");
    } else {
      return navigation.navigate("CreateAboutScreen");
    }
  };

  const [opacity, setOpacity] = useState(1);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { opacity: opacity }]}>
        {/* Top tag */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignItems: "center", marginLeft: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.nameFriend}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  textTransform: "capitalize",
                  color: "white",
                  marginLeft: 12,
                }}
              >
                {/* check type conversations ? set name group : set name user chat */}
                {idConversation?.type
                  ? userChatting?.name
                  : userChatting?.firstName + " " + userChatting?.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                  marginLeft: 12,
                }}
              >
                {/* check type conversations ? set name group : set name user chat */}
                {idConversation?.type ? (
                  <Text>{userChatting.userInfo.length} thành viên</Text>
                ) : (
                  <Text>Truy cập 11 phút trước</Text>
                )}
              </Text>
            </View>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Ionicons name="videocam-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10,
              }}
              onPress={() => {
                aboutScreen();
              }}
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        <View style={{ flex: 1 }}>
          <View style={styles.bodyListChat}>
            <FlatList
              // invertStickyHeaders={false}
              inverted={true}
              style={styles.bodyList}
              data={(() => [...listMessgae].reverse())()}
              renderItem={({ item }) => (
                <MessengerItem
                  messend={item}
                  setOpacity={setOpacity}
                  opacity={opacity}
                ></MessengerItem>
              )}
              //</View>key={"&{item.}timestamp"}
            ></FlatList>
          </View>
          {/*Footer */}
          <View style={styles.footerContainer}>
            <View style={styles.inputMess}>
              <TouchableOpacity style={styles.moreAction}>
                <Ionicons name="happy-outline" size={30} />
              </TouchableOpacity>
              <TextInput
                style={styles.textChat}
                value={newMess}
                onChangeText={(text) => handleChangText(text)}
                onFocus={onFoucsInPut}
                onBlur={onFoucsInPut}
                onSubmitEditing={handSendMess}
                blurOnSubmit={false}
                placeholder="Tin nhắn"
              ></TextInput>
            </View>

            {/* input */}
            {typing ? (
              <View style={styles.send}>
                <TouchableOpacity onPress={handSendMess}>
                  <Feather name="send" size={27} color="#3F4E4F" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.moreTag}>
                {/* <TouchableOpacity>
                  <Feather name="more-horizontal" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="mic" size={27} color="black" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => chooseFile("photo")}>
                  <Feather name="image" size={27} color="#3F4E4F" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#e5e7eb",
    justifyContent: "space-between",
  },

  headerContainer: {
    height: 60,
    backgroundColor: "#0091ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bodyContainer: {
    width: "100%",
    // height: windowHeight - 400,
  },

  footerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
  },

  inputMess: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  moreTag: {
    marginRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  send: {
    paddingRight: 10,
  },

  moreAction: {
    marginLeft: 5,
  },

  textChat: {
    fontSize: 14,
    marginHorizontal: 5,
  },

  bodyListChat: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  bodyList: {
    width: "100%",
  },
});

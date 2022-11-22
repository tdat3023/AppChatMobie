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
import ImagePicker from "react-native-image-picker";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ChatScreen = ({ navigation }) => {
  const [onFocus, setOnFocus] = useState(false);
  // const {item} = route.params;
  const [typing, setTyping] = useState(false);

  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [listMessgae, setListMessage] = useState([]);

  const onFoucsInPut = () => {
    setOnFocus(!onFocus);
  };
  const onDismiss = () => {
    Keyboard.dismiss;
    setOnFocus(!onFocus);
  };

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

  const handSendMess = async () => {
    //create new message
    const newMessSend = {
      userId: user.uid,
      content: newMess,
      conversationId: idConversation._id,
      type: "TEXT",
    };
    console.log(newMessSend);
    const messSave = await messageApi.addTextMess(newMessSend);

    // console.log("mess send", messSave);
    setListMessage((prev) => [...prev, { ...messSave }]);
    setNewMess("");

    //call soket in here
  };

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
  // const [galleryPhoto, setGalleryPhoto] = useState();
  // const options = {
  //   title: "Select Image",
  //   storageOptions: {
  //     skipBackup: true,
  //     path: "images",
  //   },
  // };

  // const openGallery = () => {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancle) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker error: " + response.error);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log(source);
  //     }
  //   });
  // };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibrary({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //   });
  //   if (!result.cancelled) {
  //     // console.log(result.uri);
  //     let localUri = result.uri;
  //     let filename = localUri.split("/").pop();
  //     console.log("_______________________________________________________");
  //     console.log("file name:" + filename);
  //     let formData = new FormData();
  //     formData.append("file", filename);
  //     console.log(formData);
  //   } else if (result.cancelled) {
  //     console.log(result);
  //   }
  // };

  // console.log(item);

  const aboutScreen = () => {
    if (idConversation.type) {
      // console.log("type", con.conversations.type);
      return navigation.navigate("AboutGroupScreen");
    } else {
      return navigation.navigate("CreateAboutScreen");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Top tag */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignItems: "center", marginLeft: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.nameFriend}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {/* check type conversations ? set name group : set name user chat */}
                {idConversation.type
                  ? userChatting.name
                  : userChatting.firstName + " " + userChatting.lastName}
              </Text>
            </View>
          </View>

          <View style={styles.moreTag}>
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Ionicons name="videocam-outline" size={24} color="black" />
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
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        {/* <KeyboardAwareScrollView> */}
        <KeyboardAvoidingView behavior="padding">
          <View
            style={[
              !onFocus
                ? { height: windowHeight - 140 }
                : { height: windowHeight - 400 },
            ]}
          >
            <View style={styles.bodyListChat}>
              <FlatList
                // invertStickyHeaders={false}
                style={styles.bodyList}
                data={listMessgae}
                renderItem={({ item }) => (
                  <MessengerItem messend={item}></MessengerItem>
                )}
                //</View>key={"&{item.}timestamp"}
              ></FlatList>
            </View>
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
                placeholder="Tin nhắn"
              ></TextInput>
            </View>

            {/* input */}
            {typing ? (
              <View style={styles.send}>
                <TouchableOpacity onPress={handSendMess}>
                  <Feather name="send" size={27} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.moreTag}>
                <TouchableOpacity>
                  <Feather name="more-horizontal" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="mic" size={27} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                //onPress={pickImage}
                >
                  <Feather name="image" size={27} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "space-between",
  },

  headerContainer: {
    //display: "flex",
    height: 60,
    backgroundColor: "#66B2FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginBottom: 10,
    // marginTop: 20,
  },

  bodyContainer: {
    // display: "flex",

    backgroundColor: "yellow",
    height: windowHeight - 400,
    // height: 500,
  },

  footerContainer: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    //borderWidth: 0.2,
  },

  inputMess: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  moreTag: {
    display: "flex",
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
    height: 40,
    flex: 1,
    borderRadius: 30,
    paddingLeft: 20,
    marginHorizontal: 5,
    backgroundColor: "#E4E4E4",
  },

  bodyListChat: {
    //flex: 1,
    width: "100%",
    alignItems: "center",
  },
  bodyList: {
    width: "100%",
    //backgroundColor: "blue",
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modalbox";
const ActionModal = () => {
  // icons
  // function renderReactList(reacts) {
  //   if (!reacts || (reacts && reacts.length == 0)) return null;
  //   let typeCheck = {};
  //   reacts.forEach((item) => {
  //     typeCheck[item.type] = true;
  //   });

  //   return (
  //     <View
  //       style={[
  //         reactListStyles.reactList,
  //         isMyMessage && reactListStyles.reactListOfMyMessage,
  //       ]}
  //     >
  //       <View style={reactListStyles.reactItem}>
  //         <Text style={reactListStyles.reactItemCount}>{reacts.length}</Text>
  //       </View>
  //       {typeCheck["1"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/love.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}

  //       {typeCheck["2"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/like.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {typeCheck["3"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/haha.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {typeCheck["4"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/wow.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {typeCheck["5"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/sad.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {typeCheck["6"] && (
  //         <TouchableOpacity style={reactListStyles.reactItem}>
  //           <Image
  //             source={require("../../images/angry.png")}
  //             style={reactListStyles.reactIcon}
  //           />
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   );
  // }

  //   return (
  //     <Modal visible={isShowModal} transparent={true}>
  //       <Pressable onPress={() => setIsShowModal(false)} style={styles.container}>
  //         <Pressable style={styles.body}>
  //           <View style={{ flexDirection: "row", width: "100%" }}>
  //             {!isMyMessage && (
  //               <View style={styles.avatar}>
  //                 {message.senderId.avatar ? (
  //                   <Image
  //                     source={{ uri: message.senderId.avatar }}
  //                     style={styles.avatarImage}
  //                   />
  //                 ) : (
  //                   <Image
  //                     source={require("../../assets/avatar.jpg")}
  //                     style={styles.avatarImage}
  //                   />
  //                 )}
  //               </View>
  //             )}
  //             <View style={[styles.message, isMyMessage && styles.myMessage]}>
  //               {!isMyMessage && (
  //                 <Text style={styles.senderName}>{message.senderId.name}</Text>
  //               )}
  //               <Text style={styles.content}>{message.content}</Text>
  //               <Text style={styles.time}>
  //                 {converDate(message.createdAt).toString}
  //               </Text>
  //               {renderReactList(message.reacts)}
  //             </View>
  //           </View>

  //           <View style={styles.reactList}>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 1)}
  //             >
  //               <Image
  //                 source={require("../../assets/like.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 2)}
  //             >
  //               <Image
  //                 source={require("../../assets/love.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 3)}
  //             >
  //               <Image
  //                 source={require("../../assets/haha.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 4)}
  //             >
  //               <Image
  //                 source={require("../../assets/wow.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 5)}
  //             >
  //               <Image
  //                 source={require("../../assets/sad.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.reactItem}
  //               onPress={() => onAddReaction(message._id, 6)}
  //             >
  //               <Image
  //                 source={require("../../assets/angry.png")}
  //                 style={styles.reactIcon}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //           <View style={styles.options}>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 pinMessage(message._id);
  //                 setIsShowModal(false);
  //               }}
  //               style={styles.optionItem}
  //             >
  //               <AntDesign
  //                 style={styles.optionIcon}
  //                 name="pushpino"
  //                 size={32}
  //                 color="#d534eb"
  //               />
  //               <Text style={styles.optionName}>Ghim</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity style={styles.optionItem}>
  //               <Feather
  //                 name="trash"
  //                 size={32}
  //                 style={styles.optionIcon}
  //                 color="#f22424"
  //               />
  //               <Text style={styles.optionName}>Xóa</Text>
  //             </TouchableOpacity>
  //             {isMyMessage && (
  //               <TouchableOpacity style={styles.optionItem}>
  //                 <MaterialCommunityIcons
  //                   name="backup-restore"
  //                   style={styles.optionIcon}
  //                   size={32}
  //                   color="#d41542"
  //                 />
  //                 <Text style={styles.optionName}>Thu hồi</Text>
  //               </TouchableOpacity>
  //             )}
  //             <TouchableOpacity onPress={() => {}} style={styles.optionItem}>
  //               <Feather
  //                 style={styles.optionIcon}
  //                 name="copy"
  //                 size={32}
  //                 color="black"
  //               />
  //               <Text style={styles.optionName}>Copy</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </Pressable>
  //       </Pressable>
  //     </Modal>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     width: "100%",
  //     height: "100%",
  //     backgroundColor: "rgba(0,0,0,0.5)",
  //     justifyContent: "flex-end",
  //   },
  //   body: {
  //     paddingHorizontal: 12,
  //     paddingVertical: 32,
  //   },
  //   avatar: {
  //     paddingRight: 12,
  //   },
  //   avatarImage: {
  //     width: 32,
  //     height: 32,
  //     borderRadius: 50,
  //   },
  //   message: {
  //     backgroundColor: "white",
  //     paddingVertical: 4,
  //     paddingHorizontal: 12,
  //     borderRadius: 14,
  //     maxWidth: "80%",
  //     borderWidth: 1,
  //     borderColor: "#1a69d9",
  //     marginBottom: 12,
  //   },
  //   myMessage: {
  //     backgroundColor: "#e5efff",
  //     marginLeft: "auto",
  //   },
  //   senderName: {
  //     color: "#bd6d29",
  //   },
  //   content: {
  //     fontSize: 17,
  //     textAlign: "justify",
  //   },
  //   time: {
  //     paddingTop: 8,
  //     color: "#666",
  //   },
  //   reactList: {
  //     flexDirection: "row",
  //     backgroundColor: "white",
  //     borderRadius: 14,
  //     marginTop: 10,
  //   },
  //   reactItem: {
  //     paddingHorizontal: 8,
  //     paddingVertical: 8,
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   reactIcon: {
  //     width: 32,
  //     height: 32,
  //   },
  //   options: {
  //     backgroundColor: "white",
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     borderRadius: 14,
  //     marginTop: 4,
  //   },
  //   optionItem: {
  //     padding: 12,
  //     width: "25%",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },

  //   optionName: {
  //     paddingTop: 8,
  //   },
  // });

  showActionModal = () => {
    this.refs.myModal.open();
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      style={styles.modal}
      position="center"
      backdrop={true}
      onClosed={() => {
        alert("close modal");
      }}
      // animationType="slide"
      // transparent={true}
      // visible={modalVisible}
      // onRequestClose={() => {
      //   setModalVisible(!modalVisible);
      // }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            // onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    width: "80%",
    height: 300,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ActionModal;

import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Contex from "../../store/Context";
const AboutGroupScreen = ({ navigation }) => {
  const { state, depatch } = React.useContext(Contex);
  const { user, userSearched, idConversation, userChatting } = state;
  const [switchOnPin, setSwitchOnPin] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const handleOpenMemberScreen = () => {
    navigation.navigate("MemberScreen");
  };

  const NavigationToAddMember = () => {
    navigation.navigate("AddMemberGroupComponent");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ViewTop}>
          <Image
            style={styles.viewAvatar}
            source={{
              uri: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {userChatting?.name}
          </Text>
          <View style={styles.viewListOpstion}>
            <TouchableOpacity>
              <View style={styles.viewListIcon}>
                <View style={styles.viewIcon}>
                  <Ionicons
                    style={{ lineHeight: 40 }}
                    name="search"
                    size={25}
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Tìm tin nhắn
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => NavigationToAddMember()}>
              <View style={styles.viewListIcon}>
                <View style={styles.viewIcon}>
                  <Ionicons
                    style={{ lineHeight: 40 }}
                    name="person"
                    size={25}
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Thêm thành viên
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.viewListIcon}>
                <View style={styles.viewIcon}>
                  <Ionicons
                    style={{ lineHeight: 40 }}
                    name="notifications"
                    size={25}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Tắt thông báo
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Tùy chỉnh
          </Text>
        </View>

        <View style={styles.viewCustomization}>
          <TouchableOpacity>
            <View style={styles.viewItem}>
              <Ionicons name="pencil" size={23} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Đổi tên nhóm</Text>
                <Ionicons
                  style={{}}
                  color={"gray"}
                  name="chevron-forward-outline"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.viewItem}>
              <Ionicons name="trash" size={23} color="red" />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15, color: "red" }}>
                  Xóa lịch sử trò chuyện
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Thêm hành động
          </Text>
        </View>

        <View style={styles.viewCustomization}>
          <TouchableOpacity>
            <View style={styles.viewItem}>
              <Ionicons name="image" size={23} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Ảnh, file & link đã gửi</Text>
                <Ionicons
                  color={"gray"}
                  name="chevron-forward-outline"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* xóa thành viên */}
          <TouchableOpacity onPress={() => handleOpenMemberScreen()}>
            <View style={styles.viewItem}>
              <Ionicons name="person-remove-outline" size={23} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>
                  Thành viên ({userChatting.userInfo.length})
                </Text>
                <Ionicons
                  style={{}}
                  color={"gray"}
                  name="chevron-forward-outline"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.viewItem}>
              <Ionicons name="ios-key-outline" size={23} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Chuyển quyền trưởng nhóm</Text>
                <Ionicons
                  style={{}}
                  color={"gray"}
                  name="chevron-forward-outline"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Riêng tư
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.viewItem}>
            <MaterialIcons name="logout" size={23} color="red" />

            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15, color: "red" }}>Rời nhóm</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.viewItem}>
            <MaterialIcons name="logout" size={23} color="red" />

            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15, color: "red" }}>Giải tán nhóm</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ display: "flex", height: 20 }}></View>
      </View>
    </ScrollView>
  );
};

export default AboutGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#F0F2F5",
  },
  viewAvatar: {
    height: 110,
    width: 110,
    borderRadius: 60,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "white",
  },
  ViewTop: {
    display: "flex",
    flexDirection: "column",
    // height: 110,
    // width: 110,
    alignContent: "center",
    alignItems: "center",
  },
  viewListOpstion: {
    display: "flex",
    // padding: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  viewIcon: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#E4E6EB",
    alignItems: "center",
    alignContent: "center",
  },
  viewListIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  viewCustomization: {
    // height: 200,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  viewItem: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 2,
  },
  viewCustomItem: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
    marginLeft: 20,
    borderBottomWidth: 0.2,
    padding: 10,
    borderBottomColor: "#E4E6EB",
  },
});

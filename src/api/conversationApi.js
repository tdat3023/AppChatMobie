import axiosClient from "./axiosClient";

const conversationApi = {
  // GET: /conversation?senderID=Ix7UVDUIrmRYOB6uGFc715drn24&receiverID=ztpYIbpqoiYVDVsf0h9Clzg7QgW2
  //res: false or conversationID
  getConversation: (senderID, receiverID) => {
    //console.log(id);
    const url = `/conversation?senderID=${senderID}&receiverID=${receiverID}`;
    return axiosClient.get(url);
  },

  // GET:
  getConversations: (id, page, size) => {
    //console.log(id);
    const url = `/conversation/user/${id}?page=${page}&size=${size}`;
    // console.log(url);
    return axiosClient.get(url);
    // return axiosClient.get(
    //   `http://13.228.206.211:3005/conversation/user/${id}`
    // );
    //http://13.228.206.211:3005/conversation/634c48221a479239b4810cb6
  },

  //[POST] /individuals/:userId`: Tạo cuộc trò chuyện cá nhân
  // -params:userId.
  // -body:userFriendId:(Ix7UVDUIrmRYOB6uGFc715drn2H3)

  createConversation: (meId, userFriendId) => {
    return axiosClient.post(`conversation/individuals/${meId}`, {
      userFriendId: userFriendId,
    });
  },

  // [POST] /coversation/groups
  createConversation: (temp) => {
    return axiosClient.post("conversation/groups", temp);
  },

  // [DELETE] /coversation/groups
  kickUserOutGroup: (idConversation, idLeader, idUserKicked) => {
    console.log("idCOnversiot:", idConversation);
    console.log("idLeader:", idLeader);
    console.log("idUserKicked:", idUserKicked);
    return axiosClient.delete(
      `conversation/members/${idConversation}/${idUserKicked}`,
      {
        data: { userId: idLeader },
      }
    );
  },
};

export default conversationApi;

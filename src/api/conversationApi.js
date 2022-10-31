import axiosClient from "../api/axiosClient";

// export default conversationApi = {
//   // GET: /conversation?senderID=Ix7UVDUIrmRYOB6uGFc715drn24&receiverID=ztpYIbpqoiYVDVsf0h9Clzg7QgW2
//   //res: false or conversationID
//   // getConversation: (senderID, receiverID) => {
//   //   //console.log(id);
//   //   const url = `/conversation?senderID=${senderID}&receiverID=${receiverID}`;
//   //   return axiosClient.get(url);
//   // },
//   // GET: /users/login
//   // send username, password
//   // res: token, user
//   getConversations: (id) => {
//     console.log(id);
//     const url = `/conversation/user/${id}`;
//     return axiosClient.get(url);
//   },
//   // createConversation: (meId, userFriendId) => {
//   //   return axiosClient.post(`/individuals/${meId}`, {
//   //     userFriendId,
//   //   });
//   // },
// };

export const getConversations = (id) => {
  console.log(id);
  const url = `/conversation/user/${id}`;
  return axiosClient.get(url);
};

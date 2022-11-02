import axiosClient from "./axiosClient";

const messageApi = {
  //conversation/634c48221a479239b4810cb6?receiverId=ztpYIbpqoiYVDVsf0h9Clzg7QgW2
  // GET: /conversation/:idConersation?receiverId
  //id: id conversation
  //uid: receiverId
  //res: list mess
  getMess: (id, uid, page, size) => {
    //console.log(id);
    const url = `/conversation/${id}?receiverId=${uid}&page=${page}&size=${size}`;
    return axiosClient.get(url);
  },
};

export default messageApi;

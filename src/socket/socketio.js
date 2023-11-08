import { io } from "socket.io-client";

let URL = "ws://127.0.0.1:5003/";

export const socket = io(URL, {
  extraHeaders: {
    authorization: "Bearer " + localStorage.getItem("JWT_TOKEN"),
  },
});
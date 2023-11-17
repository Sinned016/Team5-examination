import { io } from "socket.io-client";

let URL = "ws://";

export const socket = io(URL, {
  extraHeaders: {
    authorization: "Bearer " + localStorage.getItem("JWT_TOKEN"),
  },
});
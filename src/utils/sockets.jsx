import { io } from "socket.io-client";
import { base_URL } from "./Constants";

export const createSocketConnection = ()=>{
    return io (base_URL);
}
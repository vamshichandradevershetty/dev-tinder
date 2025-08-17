import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/sockets";
import { useSelector } from "react-redux";
import axios from "axios";
import { base_URL } from "../utils/Constants";

export const Chat = ()=>{
    const {targetUserId} = useParams();
    const [messages,setMessages] =useState([]);
    const [newMessage,setNewMessage] = useState("");
    //console.log(targetUserId);
    const user = useSelector((store)=>store.user);
    const userId = user?.data?._id;
    const firstName = user?.data?.firstName;
    const lastName = user?.data?.lastName;
    //console.log(userId);
    const sendMessage =()=>{
        const socket = createSocketConnection();
        socket.emit("sendMessage",{ firstName,lastName,userId,targetUserId,newMessage});
        setNewMessage("");
    }
    const fetchChatMessages = async()=>{
        const chat = await axios.get(base_URL+"/chat/"+targetUserId,{withCredentials:true});
        console.log(chat.data.messages);
        const chatMessages = chat?.data?.messages.map((msg)=> { return { firstName: msg?.senderId?.firstName,lastName:msg?.senderId?.lastName,text: msg?.text }})
        setMessages(chatMessages);
    }
    useEffect(()=>{
        fetchChatMessages();
    },[]);
    useEffect(()=>{
        if(!userId) return ;
        const socket = createSocketConnection();
        //as soon as the page load, the socket connection is made and joinChat event is emitted joinChat is event we written in backend and the name has to be same
        socket.emit("joinChat", {firstName,userId,targetUserId});
        //we written in return in useEffect as the return is called when component is unmounted from page we disconnect the socket connection
        socket.on("message Received",({firstName,lastName,newMessage})=>{
            //console.log(firstName+": "+newMessage);
            setMessages((messages)=>[...messages,{firstName,lastName,newMessage}])
        })
        return ()=>{
            socket.disconnect();
        }   
    },[userId,targetUserId]);

    return (
        <div className="w-1/2 mx-auto m-5 h-[70vh] flex flex-col border border-gray-600">
            <h1 className=" font-bold text-xl p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-y-scroll p-5">
            {
                messages.map((msg,index)=>{
                return (
                    <div key={index}>
                  <div className={"chat "+(firstName === msg.firstName ? "chat-end":"chat-start")}>
                  <div className="chat-header">
                    {msg.firstName +" "+ msg.lastName}
                    <time className="text-xs opacity-50">2 hours ago</time>
                     </div>
                         <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                   </div>
                );    
                })
            }
            </div>
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
            <input  value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}className="p-2 border border-gray-600 flex-1" type="text" placeholder="Enter a message"/>
            <button onClick={sendMessage}className="btn btn-primary">Send</button>
            </div>
        </div>
    );
}
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthuser from '../hooks/useAuthuser'
import { useQuery } from '@tanstack/react-query';
import { axiosinstance } from '../lib/axios';
import {Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import toast from 'react-hot-toast';
function ChatPage() {
  const{id:targetUserId}=useParams();
const [chatClient,setChatClient]=useState(null)
const [chatChannel,setChatChannel]=useState(null)
const [loading,setLoading]=useState(true)

const {authUser}=useAuthuser();
const Stream_API_KEY=import.meta.env.VITE_STREAM_API_KEY;
const {data:tokenData}=useQuery(
  {
    queryKey:["streamToken"],
    queryFn:async()=>{
      const response=await axiosinstance.get("/chat/token");
      return response.data;
      
    }, 
    enabled:!!authUser    //  so that run only when authuser is there
  
  }
)

useEffect(()=>{
  const initChat=async()=>{
    if(!tokenData?.token){
      return;
    }  
  try {
    const client= StreamChat.getInstance(Stream_API_KEY);
    await client.connectUser({
      id:authUser._id,
      name:authUser.Fullname,
      image:authUser.profilepic
    },tokenData.token);

    const channelId=[authUser._id,targetUserId].sort().join("-"); 

    const currentChannel=client.channel("messaging",channelId,{
      members:[authUser._id,targetUserId]
    });

    await currentChannel.watch();
    setChatChannel(currentChannel)
    setChatClient(client)
  } catch (error) {
    console.log(error)
    toast.error("Error connecting to chat")
  }finally{
    setLoading(false)
  }
  
  } 
  initChat();

},[tokenData,authUser,Stream_API_KEY,targetUserId]);
if(loading)return <div>Loading...</div>
else{
  return (
    <div className='h-[93vh]'>

      <Chat client={chatClient}>
        <Channel channel={chatChannel}>
<div className='w-full relative'>
<Window>
  <ChannelHeader></ChannelHeader>
<MessageList></MessageList>
<MessageInput focus/>
</Window>
</div>
        </Channel>
        </Chat> 

    </div>
  )} 
}

export default ChatPage

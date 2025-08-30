/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router'
import useAuthuser from '../hooks/useAuthuser';
import { useQuery } from '@tanstack/react-query';
import { axiosinstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { StreamVideo, StreamVideoClient,StreamCall,CallControls,SpeakerLayout,StreamTheme,CallingState,useCallStateHooks } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
const Stream_API_KEY=import.meta.env.VITE_STREAM_API_KEY;

function CallPage() {
const {id:callId}=useParams();
const[client,setClient]=useState(null);
const[call,setCall]=useState(null);
const[isConnecting,setisConnecting]=useState(null); 
const{authUser,isLoading}=useAuthuser()


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
  const initCall=async()=>{
    if(!tokenData?.token){
      return;
    }
    try {
      const user={
        id:authUser._id,
        name:authUser?.fullname,
        image:authUser.profilepic 
      }
      const videoClient=new StreamVideoClient({apiKey:Stream_API_KEY,user,token:tokenData.token}); 
      
      const callInstance = videoClient.call('default', callId);
      await callInstance.join({create:true});
   setClient(videoClient);
   setCall( callInstance);
      
    } catch (error) {
      console.log(error)
      toast.error("Error connecting to call")

    }finally{
      setisConnecting(false)
    }


  }
initCall();
},[tokenData ,authUser,callId])
  return (
    <div className='h-screen w-screen bg-white flex flex-col justify-center items-center'>
      {client && call ? (
         <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
      ) : (
        <div className='text-white'>Error in connecting call. Please refresh the page...<br/>  Try again later </div>
      )}
    </div>
  )
}

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage

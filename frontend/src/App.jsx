/* eslint-disable no-unused-vars */
import React from 'react'
import {Routes,Route ,Navigate} from 'react-router'
import HomePage from '../src/pages/HomePage'
import SignUpPage from '../src/pages/SignUpPage'
import LoginPage from '../src/pages/LoginPage'
import NotificationsPage from '../src/pages/NotificationsPage'
import CallPage from '../src/pages/CallPage'
import ChatPage from '../src/pages/ChatPage'
import OnBoardingPage from '../src/pages/OnBoardingPage'
import {Toaster} from 'react-hot-toast'
import {useQuery} from "@tanstack/react-query"
import { axiosinstance } from './lib/axios'
function App() {
  const{data:authData,isloading,error}=useQuery({
queryKey:['authUser'],
queryFn:async()=>{
  const res=await axiosinstance.get("/auth/me")
  return res.data;
},retry:false
  })

  const authUser=authData?.user
  return (
    <div>
      <Toaster/>
      <Routes>
<Route path='/' element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
<Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to='/'/>}/>
<Route path='/login' element={!authUser?<LoginPage/>:<Navigate to='/'/>}/>
<Route path='/notifications' element={authUser?<NotificationsPage/>:<Navigate to='/login'/>}/>
<Route path='/call' element={authUser?<CallPage/>:<Navigate to='/login'/>}/>
<Route path='/chat' element={authUser?<ChatPage/>:<Navigate to='/login'/>}/>
<Route path='/onboarding' element={authUser?<OnBoardingPage/>:<Navigate to='/login'/> }/>
      </Routes>
    </div>
  )
}

export default App

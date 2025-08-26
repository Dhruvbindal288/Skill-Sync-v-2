import React from 'react'
import {Routes,Route} from 'react-router'
import HomePage from '../src/pages/HomePage'
import SignUpPage from '../src/pages/SignUpPage'
import LoginPage from '../src/pages/LoginPage'
import NotificationsPage from '../src/pages/NotificationsPage'
import CallPage from '../src/pages/CallPage'
import ChatPage from '../src/pages/ChatPage'
import OnBoardingPage from '../src/pages/OnBoardingPage'
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div>
      <Toaster/>
      <Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/signup' element={<SignUpPage/>}/>
<Route path='/login' element={<LoginPage/>}/>
<Route path='/notifications' element={<NotificationsPage/>}/>
<Route path='/call' element={<CallPage/>}/>
<Route path='/chat' element={<ChatPage/>}/>
<Route path='/onboarding' element={<OnBoardingPage/>}/>
      </Routes>
    </div>
  )
}

export default App

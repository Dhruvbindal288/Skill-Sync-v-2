/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "../src/pages/HomePage";
import SignUpPage from "../src/pages/SignUpPage";
import LoginPage from "../src/pages/LoginPage";
import NotificationsPage from "../src/pages/NotificationsPage";
import CallPage from "../src/pages/CallPage";
import ChatPage from "../src/pages/ChatPage";
import OnBoardingPage from "../src/pages/OnBoardingPage";
import { Toaster } from "react-hot-toast";

import { axiosinstance } from "./lib/axios";
import { getAuthUser } from "./lib/api";
import useAuthuser from "./hooks/useAuthuser";
function App() {
  const { isLoading, authUser } = useAuthuser();
if (isLoading) {
  return <div>Loading...</div>; 
}

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isonboarded;


  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : isAuthenticated ? (
              <Navigate to="/onboarding" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (isOnboarded?<Navigate to="/" />:<OnBoardingPage />) : (<Navigate to="/login" />)
          }
        />
      </Routes>
    </div>
  );
}

export default App;

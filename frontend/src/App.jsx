import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster,toast } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();

  console.log({onlineUsers});

  useEffect(() => {
  checkAuth();
}, []);
  console.log("authUser:", authUser);
  console.log("isCheckingAuth:", isCheckingAuth);

  return (
    <div data-theme="retro">
      <Navbar />
       <Toaster position="top-right" reverseOrder={false} />

      {isCheckingAuth && !authUser ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser? <LoginPage /> : <Navigate to="/"/>} />
          <Route path='/signup' element={!authUser? <SignUpPage />: <Navigate to="/"/>} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;

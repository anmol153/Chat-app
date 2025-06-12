import { Routes,Route, Navigate } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Sign_in from "./Components/Sign_in"
import SignUp from './Components/Sign_up';
import Settings from "./Components/Settings"
import Profile from "./Components/Profile"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from "./store/useThemestore";
function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();
  const {theme} = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[]);

  if(isCheckingAuth && !authUser) return (
     <div className="flex items-cneter justify-center h-screen">
      <Loader className="size-10 animate-spin" />
     </div>
  )
  return (
    <>
      <div data-theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar/>
        <Routes>
          <Route path="/" element = {authUser ? <Home/> : <Navigate to="/Signup"/>}/>
          <Route path="/Signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <Sign_in /> : <Navigate to="/" />} />
          <Route path="/settings" element = {<Settings/>}/>
          <Route path="/profile" element = {authUser ? <Profile/> : <Navigate to="/Signup"/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

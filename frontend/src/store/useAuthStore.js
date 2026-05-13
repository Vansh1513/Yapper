import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL="http://localhost:5001";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false, 
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
        console.log("Error in checkAuth",error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
 console.log("📤 Sending signup data:", JSON.stringify(data, null, 2));

  set({ isSigningUp: true });

  try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });
    toast.success("Account created successfully");
    get().connectSocket(); 
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
  } finally {
    set({ isSigningUp: false });
  }
},
  logout:async()=>{
    try {
        await axiosInstance.post("/auth/logout");
        set({authUser:null});
        toast.success("Logged Out successfully");
        get().disconnectSocket();
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },
login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);

    // ✅ Extra safety check so app won’t crash if backend is down
    if (!res || !res.data) {
      throw new Error("No response from server");
    }

    console.log("Login response:", res.data); 
    set({ authUser: res.data });
    toast.success("Logged in successfully");
    get().connectSocket();
  } catch (error) {
    // ✅ Better error handling (fallback if backend not reachable)
    console.error("Login error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    set({ isLoggingIn: false });
  }
},
  updateProfile:async(data)=>{
    set({isUpdatingProfile:true});
    try {
        const res=await axiosInstance.put("/auth/update-profile",data);
        set({authUser:res.data});
        toast.success("Profile updated successfully");
    } catch (error) {
        console.log("Error in update profile",error);
        toast.error(error.response.data.message); 
    }
    finally{
        set({isUpdatingProfile:false});
    }
  },
  connectSocket:()=>{
    const {authUser}=get();
    if(!authUser || get().socket?.connected) return;
    const socket=io(BASE_URL,{
        query:{
            userId:authUser._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        forceNew: true,
    });
    socket.connect();

    set({socket:socket});

    socket.on("connect", () => {
        console.log("🔌 Socket connected! ID:", socket.id, "UserID sent:", authUser._id);
    });

    socket.on("getOnlineUsers",(userIds)=>{
        console.log("🟢 Online users received from server:", userIds);
        set({onlineUsers:userIds});
    })
  },
  disconnectSocket:()=>{
    const { socket } = get();
    if(socket?.connected){
        socket.disconnect();
    }
    // Crucial: Clear socket out of Zustand so it rebuilds clean next connect
    set({ socket: null, onlineUsers: [] });
  },
}));

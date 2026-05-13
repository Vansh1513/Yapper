import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  typingUsers: [],

  // Fetch all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Failed to load users";
      toast.error(message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages with a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Failed to load messages";
      toast.error(message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // ✅ use functional update to avoid stale state
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Failed to send message";
      toast.error(message);
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
      }));
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete message");
    }
  },

  subscribeToMessages:()=>{
    const {selectedUser}=get();
    if(!selectedUser){
        return;
    }
    const socket=useAuthStore.getState().socket;

    socket.on("newMessage",(newMessage)=>{
        const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id;
        if(!isMessageSentFromSelectedUser){
            return;
        }
        set({
            messages:[...get().messages,newMessage],
        });
    });

    socket.on("typing", ({ senderId }) => {
        set((state) => ({ typingUsers: [...new Set([...state.typingUsers, senderId])] }));
    });
    
    socket.on("stopTyping", ({ senderId }) => {
        set((state) => ({ typingUsers: state.typingUsers.filter(id => id !== senderId) }));
    });

    socket.on("messageDeleted", (messageId) => {
        set((state) => ({ messages: state.messages.filter(msg => msg._id !== messageId) }));
    });
  },
  unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("messageDeleted");
  },
  // Select user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages, deleteMessage, typingUsers } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto z-10" style={{ background: "transparent" }}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative z-10" style={{ background: "transparent" }}>
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1 relative custom-scrollbar z-0">
        {messages.map((message) => (
          <ChatBubble 
            key={message._id}
            message={message}
            isSender={message.senderId === authUser._id}
            selectedUser={selectedUser}
            authUser={authUser}
            onDelete={deleteMessage}
          />
        ))}

        {/* Typing Indicator Bubble */}
        {typingUsers.includes(selectedUser._id) && (
          <div className="flex w-full justify-start mb-4 px-2 lg:px-6 animate-in fade-in slide-in-from-bottom-2 duration-300" ref={messageEndRef}>
            <div className="flex-shrink-0 mr-3 hidden sm:block">
               <img src={selectedUser.profilePic || "/avatar.png"} alt="profile" className="size-8 rounded-full object-cover" style={{ border: "2px solid rgba(255,255,255,0.1)" }} />
            </div>
            <div className="rounded-2xl rounded-bl-sm p-3 w-16 h-10 flex items-center justify-center shadow-md" style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(139,92,246,0.2)" }}>
              <span className="flex gap-1 items-center justify-center h-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]"></div>
              </span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} className="h-2" />
      </div>

      <div className="z-10 backdrop-blur-md p-2 lg:p-4" style={{ background: "rgba(5, 10, 24, 0.7)", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;

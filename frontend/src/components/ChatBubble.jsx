import React, { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { formatMessageTime } from "../lib/utils";

const ChatBubble = ({ message, isSender, selectedUser, authUser, onDelete }) => {
  const messageEndRef = useRef(null);

  // Smooth scroll into view when this component mounts (useful for the last message)
  useEffect(() => {
    if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);
  
  return (
    <div className={`flex w-full ${isSender ? "justify-end" : "justify-start"} mb-4 px-2 lg:px-6 group`} ref={messageEndRef}>
      
      {/* Receiver avatar */}
      {!isSender && (
        <div className="flex-shrink-0 mr-3 hidden sm:block">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt="profile"
            className="size-8 rounded-full object-cover"
            style={{ border: "2px solid var(--bubble-recv-border)" }}
          />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`relative max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300`}>
        {/* Name header for receivers in group chats context, but good for DMs too */}
        {!isSender && <span className="text-[11px] mb-0.5 ml-1 font-semibold tracking-wide uppercase" style={{ color: "var(--text-muted)" }}>{selectedUser?.fullName}</span>}

        <div
          className={`relative p-3 shadow-md text-[15px] leading-relaxed break-words transition-all`}
          style={isSender ? {
            background: "var(--bubble-sent)",
            border: "0.5px solid var(--bubble-sent-border)",
            color: "var(--bubble-sent-text)",
            borderRadius: "16px 4px 16px 16px",
          } : {
            background: "var(--bubble-recv)",
            border: "0.5px solid var(--bubble-recv-border)",
            color: "var(--bubble-recv-text)",
            borderRadius: "4px 16px 16px 16px",
          }}
        >
          {message.image && (
            <img
              src={message.image}
              alt="Attachment"
              className="max-w-full sm:max-w-[250px] rounded-lg mb-2 object-cover border border-black/5"
            />
          )}
          {message.text && (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}

          {/* Timestamp inline */}
          <div className={`text-[10px] sm:text-xs mt-1 text-right flex items-center justify-end gap-1`} style={{ color: isSender ? "var(--timestamp-sent)" : "var(--timestamp-recv)" }}>
            {formatMessageTime(message.createdAt)}
            {/* If sent, add double tick placeholder */}
            {isSender && (
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
            )}
          </div>
        </div>

        {/* Delete action */}
        {isSender && (
          <button
            onClick={() => onDelete(message._id)}
            className="absolute -left-10 md:-left-12 top-1/2 -translate-y-1/2 p-2 text-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-rose-500 hover:text-white shadow-sm scale-90 hover:scale-100"
            style={{ background: "var(--glass-panel)", border: "0.5px solid var(--glass-border)" }}
            title="Delete this message"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

    </div>
  );
};

export default ChatBubble;

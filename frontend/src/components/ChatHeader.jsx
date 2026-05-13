import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X, Phone, Video, MoreVertical } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const isTyping = typingUsers.includes(selectedUser?._id);
  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) return null;

  return (
    <div className="px-4 py-3 z-10 w-full flex items-center justify-between transition-colors relative"
         style={{ background: "var(--header-blur)", backdropFilter: "blur(12px)", borderBottom: "0.5px solid var(--glass-border)" }}>
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="size-10 rounded-full object-cover"
            style={{ border: "2px solid var(--glass-border)" }}
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full shadow-sm" style={{ border: "2px solid var(--bg-main)" }} />
          )}
        </div>

        {/* User info */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-[15px] leading-tight" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>{selectedUser.fullName}</h3>
          <p className="text-xs pt-0.5" style={{ color: "var(--text-muted)" }}>
            {isTyping ? (
              <span className="font-medium animate-pulse tracking-wide" style={{ color: "var(--text-main)" }}>Typing...</span>
            ) : isOnline ? (
              <span style={{ color: "var(--text-main)", opacity: 0.9 }}>Online</span>
            ) : (
              <span>Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="p-2 rounded-full transition-all hover:scale-110 hidden sm:block pointer-events-none opacity-50" title="Audio call (demo)" style={{ color: "var(--text-muted)" }}>
           <Phone size={18} />
        </button>
        <button className="p-2 rounded-full transition-all hover:scale-110 hidden sm:block pointer-events-none opacity-50" title="Video call (demo)" style={{ color: "var(--text-muted)" }}>
           <Video size={18} />
        </button>
        <button className="p-2 rounded-full transition-all hover:scale-110 hidden sm:block pointer-events-none opacity-50" title="More options (demo)" style={{ color: "var(--text-muted)" }}>
           <MoreVertical size={18} />
        </button>
        
        <div className="w-px h-6 mx-1 hidden sm:block" style={{ background: "var(--glass-border)" }}></div>
        
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full transition-all hover:scale-110"
          title="Close chat"
          style={{ color: "var(--text-muted)" }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

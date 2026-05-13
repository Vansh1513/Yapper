import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const SidebarItem = ({ user, isSelected }) => {
  const { setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const isOnline = onlineUsers.includes(user._id);
  const isTyping = typingUsers.includes(user._id);

  return (
    <button
      onClick={() => setSelectedUser(user)}
      className={`
        w-full p-3 lg:p-4 flex items-center gap-4 transition-all duration-200 group outline-none
      `}
      style={isSelected ? {
        background: "var(--glass-panel)",
        borderLeft: "3px solid var(--text-main)"
      } : {
        background: "transparent",
        borderLeft: "3px solid transparent"
      }}
      onMouseEnter={e => !isSelected && (e.currentTarget.style.background = "var(--hover-bg)")}
      onMouseLeave={e => !isSelected && (e.currentTarget.style.background = "transparent")}
    >
      <div className="relative flex-shrink-0">
        <img
          src={user.profilePic || "/avatar.png"}
          alt={user.fullName}
          className={`size-12 object-cover rounded-full transition-transform duration-300 group-hover:scale-105`}
          style={isOnline ? { border: "2px solid var(--text-main)", padding: "2px" } : { border: "2px solid var(--glass-border)" }}
        />
        {isOnline && (
          <span className="absolute bottom-1 right-0 size-3 bg-green-400 rounded-full shadow-sm animate-pulse" style={{ border: "2px solid var(--bg-main)" }} />
        )}
      </div>

      <div className="text-left min-w-0 flex-1 hidden lg:block">
        <div className="flex justify-between items-center mb-0.5">
          <div className="font-semibold truncate" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>{user.fullName}</div>
        </div>
        <div className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
          {isTyping ? (
            <span style={{ color: "var(--text-main)" }} className="font-medium animate-pulse">Typing...</span>
          ) : isOnline ? (
            <span style={{ color: "var(--text-main)", opacity: 0.8 }}>Online</span>
          ) : (
            <span>Offline</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default SidebarItem;

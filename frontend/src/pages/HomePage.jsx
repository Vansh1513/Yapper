import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
const HomePage = () => {
    const {selectedUser}=useChatStore();
  return (
    <div className="h-screen w-full flex overflow-hidden font-sans transition-colors duration-300" style={{ background: "var(--bg-main)", color: "var(--text-main)" }}>
      {/* ── Stars Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              background: "var(--star-color)",
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: `calc(var(--star-opacity-base) + ${Math.random()} * (var(--star-opacity-peak) - var(--star-opacity-base)))`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;

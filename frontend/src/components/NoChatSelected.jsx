import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden h-full z-10" style={{ background: "transparent" }}>
      <div className="text-center z-10 p-8 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
        
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
             style={{ background: "var(--bubble-sent)", border: "0.5px solid var(--bubble-sent-border)" }}>
           <MessageSquare className="size-10" style={{ filter: "drop-shadow(0px 0px 8px var(--orb-cyan))", color: "var(--text-main)" }} />
        </div>
        
        <h2 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>Yapper Web</h2>
        
        <p className="text-sm leading-relaxed mb-8 px-4" style={{ color: "var(--text-muted)" }}>
          Send and receive messages seamlessly. Select a conversation from the sidebar to get started.
        </p>

        <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full shadow-sm text-xs font-semibold tracking-wide"
             style={{ background: "var(--glass-panel)", border: "0.5px solid var(--glass-border)", color: "var(--text-main)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 mr-2" style={{ color: "var(--text-muted)" }}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          End-to-end encrypted experience
        </div>
      </div>
    </div>
  );
};
export default NoChatSelected;
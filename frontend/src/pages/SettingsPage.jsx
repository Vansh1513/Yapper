import { useThemeStore } from "../store/useThemeStore";
import { Send, Moon, Sun, Monitor } from "lucide-react";
import { useEffect } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const THEMES = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="h-screen w-full flex justify-center overflow-y-auto px-4 pt-20 pb-10 transition-colors duration-500" style={{ background: "transparent" }}>
      <div className="w-full max-w-4xl space-y-8 mt-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>Appearance Settings</h2>
          <p className="text-[15px]" style={{ color: "var(--text-muted)" }}>
            Customize the look and feel of your workspace to match your style.
          </p>
        </div>

        {/* Theme Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {THEMES.map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden group border`}
                style={{
                  background: isSelected ? "var(--glass-panel)" : "transparent",
                  borderColor: isSelected ? "var(--orb-cyan)" : "var(--glass-border)",
                  boxShadow: isSelected ? "0 4px 20px -5px rgba(0, 198, 255, 0.15)" : "none",
                }}
              >
                {/* Glow map for selected state */}
                {isSelected && (
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-[var(--orb-cyan)] to-transparent pointer-events-none" />
                )}
                
                <div className={`p-3 rounded-full transition-colors duration-300`} style={{ background: isSelected ? "var(--orb-cyan)" : "var(--hover-bg)", color: isSelected ? "#fff" : "var(--text-main)" }}>
                  <Icon size={22} className={isSelected && t.id === "dark" ? "" : ""} />
                </div>
                
                <div className="flex flex-col items-start text-left z-10">
                  <span className="font-semibold text-lg" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>{t.label} Theme</span>
                  <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {t.id === "light" ? "Clean, high contrast interface" : "Deep cosmic aesthetic"}
                  </span>
                </div>

                {/* Active Indicator Hook */}
                {isSelected && (
                   <div className="absolute right-6 size-2.5 rounded-full bg-[var(--orb-cyan)] shadow-[0_0_10px_var(--orb-cyan)]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Interactive Preview Section */}
        <div className="pt-6">
          <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>Live Preview</h3>
          
          <div className="rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl relative"
               style={{ 
                 background: "var(--bg-main)", 
                 border: "1px solid var(--glass-border)",
                 height: "400px"
               }}>
            
            {/* Embedded mockup to demonstrate the specific theme */}
            <div className="absolute inset-0 z-0">
               {/* Ambient Background Orbs specific to Theme Preview context */}
               <div className="absolute top-10 -left-10 w-40 h-40 rounded-full blur-[80px]" style={{ background: "var(--orb-cyan)" }} />
               <div className="absolute bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px]" style={{ background: "var(--orb-purple)" }} />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col backdrop-blur-3xl" style={{ background: "var(--glass-panel)" }}>
              {/* Fake Chat Header */}
              <div className="px-5 py-4 w-full flex items-center gap-4 border-b" style={{ borderColor: "var(--glass-border)" }}>
                <div className="size-10 rounded-full flex items-center justify-center font-bold text-lg"
                     style={{ background: "linear-gradient(135deg, var(--orb-cyan), var(--orb-purple))", color: "#fff" }}>
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-[15px]" style={{ color: "var(--text-main)" }}>Alex Designer</h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Online</p>
                </div>
              </div>

              {/* Fake Chat Messages */}
              <div className="flex-1 p-5 space-y-5 overflow-y-auto w-full max-w-3xl mx-auto custom-scrollbar">
                {PREVIEW_MESSAGES.map((message) => (
                  <div key={message.id} className={`flex w-full ${message.isSent ? "justify-end" : "justify-start"} animate-in fade-in`}>
                     <div
                        className={`p-3.5 shadow-sm text-[15px] leading-relaxed`}
                        style={message.isSent ? {
                          background: "var(--bubble-sent)",
                          border: "0.5px solid var(--bubble-sent-border)",
                          color: "var(--bubble-sent-text)",
                          borderRadius: "16px 4px 16px 16px",
                          maxWidth: "75%"
                        } : {
                          background: "var(--bubble-recv)",
                          border: "0.5px solid var(--bubble-recv-border)",
                          color: "var(--bubble-recv-text)",
                          borderRadius: "4px 16px 16px 16px",
                          maxWidth: "75%"
                        }}
                      >
                        <p>{message.content}</p>
                        <p className={`text-[10px] mt-1.5 text-right`} style={{ color: message.isSent ? "var(--timestamp-sent)" : "var(--timestamp-recv)" }}>
                          12:00 PM
                        </p>
                      </div>
                  </div>
                ))}
              </div>

              {/* Fake Chat Input */}
              <div className="p-4 border-t flex gap-3 w-full max-w-3xl mx-auto" style={{ borderColor: "var(--glass-border)" }}>
                <div className="flex-1 py-3 px-4 rounded-full text-sm"
                     style={{ background: "var(--bg-input)", border: "1px solid var(--glass-border)", color: "var(--text-main)" }}>
                  Type a message...
                </div>
                <button className="size-11 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105"
                        style={{ background: "linear-gradient(90deg, #00C6FF, #8B5CF6)" }}>
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div> 
    </div>
  );
};

export default SettingsPage;

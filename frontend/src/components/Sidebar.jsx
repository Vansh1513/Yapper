import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import SidebarItem from "./SidebarItem";
import { Search, LogOut } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, selectedUser } = useChatStore();
  const { authUser, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = users.filter((user) => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="h-full w-24 lg:w-[320px] flex flex-col backdrop-blur-xl transition-all duration-300 relative z-20"
      style={{
        background: "var(--glass-panel)",
        borderRight: "0.5px solid var(--glass-border)",
      }}
    >
      {/* Header section w/ Search */}
      <div className="p-3 lg:p-5 z-10 bg-transparent flex-shrink-0" style={{ borderBottom: "0.5px solid var(--glass-border)" }}>
        <h1 className="text-2xl font-bold hidden lg:block tracking-tight mb-4" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-main)" }}>Chats</h1>
        
        <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="size-4 opacity-70" style={{ color: "var(--text-main)" }} />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "var(--bg-input)",
              border: "0.5px solid var(--glass-border)",
              color: "var(--text-main)",
            }}
            onFocus={e => e.target.style.borderColor = "var(--orb-cyan)"}
            onBlur={e => e.target.style.borderColor = "var(--glass-border)"}
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="lg:hidden flex justify-center py-2">
             <Search className="size-6 opacity-70" style={{ color: "var(--text-main)" }} />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto w-full py-2 custom-scrollbar">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <SidebarItem 
              key={user._id} 
              user={user} 
              isSelected={selectedUser?._id === user._id} 
            />
          ))
        ) : (
          <div className="text-center text-zinc-500 py-8 text-sm hidden lg:block">
            No contacts found
          </div>
        )}
      </div>

      {/* Current User Profile Footer */}
      <div className="p-4 flex items-center justify-between flex-shrink-0" style={{ background: "var(--glass-panel)", borderTop: "0.5px solid var(--glass-border)" }}>
        <div className="flex items-center gap-3 w-auto max-w-[130px] lg:max-w-full overflow-hidden">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt="Profile"
            className="size-10 rounded-full object-cover"
            style={{ border: "2px solid var(--orb-cyan)" }}
          />
          <div className="hidden lg:block min-w-0">
            <div className="font-semibold text-sm truncate leading-tight" style={{ color: "var(--text-main)" }}>{authUser?.fullName}</div>
            <div className="text-[11px] font-medium tracking-wide mt-0.5 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
               <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
               Online
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
           <button onClick={logout} className="p-2 rounded-full transition-colors hover:scale-110 duration-200" title="Log out" style={{ color: "var(--text-muted)" }}>
             <LogOut size={18} />
           </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
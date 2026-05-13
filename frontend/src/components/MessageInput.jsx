import React, { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Image, Send, X, Smile, Paperclip } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { sendMessage } = useChatStore();
  const { socket } = useAuthStore();

  const handleInputChange = (e) => {
    setText(e.target.value);
    const { selectedUser } = useChatStore.getState();
    
    if (socket && selectedUser) {
      socket.emit("typing", { receiverId: selectedUser._id });
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", { receiverId: selectedUser._id });
      }, 2000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      const { selectedUser } = useChatStore.getState();
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        receiverId: selectedUser?._id,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      const { selectedUser } = useChatStore.getState();
      if (socket && selectedUser) {
         socket.emit("stopTyping", { receiverId: selectedUser._id });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Image Preview Area */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 px-2">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-zinc-800 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-800 text-zinc-200
              flex items-center justify-center border border-zinc-700 shadow-md hover:bg-zinc-700 transition-colors"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-2 px-1 w-full">
        <div className="flex-1 flex items-center rounded-[28px] transition-all shadow-sm px-1 py-1"
             style={{ background: "var(--bg-input)", border: "0.5px solid var(--glass-border)" }}>
          
          {/* Dummy Emoji Button */}
          <button type="button" className="p-2.5 transition-colors rounded-full hover:scale-110" title="Emoji" style={{ color: "var(--text-muted)" }}>
             <Smile size={22} />
          </button>
          
          {/* Dummy Attachment (reusing image upload logic purely for demo) */}
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 transition-colors rounded-full hidden sm:block hover:scale-110" title="Attach file" style={{ color: "var(--text-muted)" }}>
             <Paperclip size={20} />
          </button>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <input
            type="text"
            className="flex-1 bg-transparent py-2.5 px-3 focus:outline-none text-[15px] placeholder:text-zinc-500"
            style={{ color: "var(--text-main)" }}
            placeholder="Type a message"
            value={text}
            onChange={handleInputChange}
          />
          
          {/* Quick Photo Upload Icon inside bar */}
          {!text.trim() && (
             <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 transition-colors rounded-full mr-1 hover:scale-110" style={{ color: "var(--text-muted)" }}>
               <Image size={20} />
             </button>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="flex-shrink-0 size-12 mb-0.5 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #00C6FF, #8B5CF6)" }}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className="ml-1" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

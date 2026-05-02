import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, File as FileIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  draggedFiles?: File[];
  removeFile?: (index: number) => void;
  clearFiles?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled, 
  draggedFiles = [], 
  removeFile, 
  clearFiles 
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if ((!input.trim() && draggedFiles.length === 0) || disabled) return;
    
    // BACKEND TEAM: handle file upload API here
    // Files currently stored in frontend state only
    onSendMessage(input.trim());
    setInput("");
    
    if (clearFiles) {
      clearFiles();
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };



  return (
    <div className="p-4 bg-transparent">
      <div className="max-w-3xl mx-auto relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C3AED]/20 to-[#A78BFA]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
        <div className="relative bg-[#1C1A25]/90 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col p-2 shadow-lg">
          
          {/* File Preview Area */}
          {draggedFiles.length > 0 && (
            <div className="flex gap-2 overflow-x-auto custom-scrollbar p-2 mb-2 max-h-32">
              {draggedFiles.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`} 
                  className="shrink-0 flex items-center gap-2 bg-[#12101A] border border-white/10 rounded-lg pl-3 pr-1 py-1.5 animate-in fade-in zoom-in-95 duration-200"
                >
                  <FileIcon size={14} className="text-[#7C3AED]" />
                  <span className="text-xs text-[#E5E7EB] max-w-[120px] truncate">
                    {file.name}
                  </span>
                  <button 
                    onClick={() => removeFile?.(index)}
                    className="p-1 hover:bg-white/10 rounded-md text-[#9CA3AF] hover:text-white transition-colors ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end">
            {/* Attachment Button UI */}
            <button 
              type="button"
              className="p-3 text-[#9CA3AF] hover:text-[#7C3AED] transition-colors rounded-xl hover:bg-white/5 hover:scale-105"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Broq..."
              className="flex-1 max-h-[200px] min-h-[44px] bg-transparent text-[#E5E7EB] placeholder:text-[#9CA3AF]/60 resize-none py-3 px-2 focus:outline-none custom-scrollbar leading-relaxed"
              rows={1}
              disabled={disabled}
            />

            <button
              onClick={handleSend}
              disabled={(!input.trim() && draggedFiles.length === 0) || disabled}
              className={`p-3 rounded-xl ml-2 transition-all duration-200 flex items-center justify-center hover:scale-105 ${
                (input.trim() || draggedFiles.length > 0) && !disabled
                  ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-md shadow-[#7C3AED]/20"
                  : "bg-white/5 text-[#9CA3AF] cursor-not-allowed"
              }`}
              title="Send message"
            >
              <Send size={18} className={(input.trim() || draggedFiles.length > 0) && !disabled ? "translate-x-0.5 -translate-y-0.5" : ""} />
            </button>
          </div>
        </div>
      </div>
      {/* <div className="max-w-3xl mx-auto text-center mt-3">
        <p className="text-xs text-[#9CA3AF]/60">
          My AI can make mistakes. Consider verifying important information.
        </p>
      </div> */}
    </div>
  );
};

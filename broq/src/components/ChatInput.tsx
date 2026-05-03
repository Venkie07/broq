import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X, File as FileIcon } from "lucide-react";
import { useTheme } from "../App";
import { styles } from "../theme";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { activeTheme } = useTheme();
  const t = styles[activeTheme];

  // Unified file handler for both drag-and-drop and attachment
  const handleFiles = (incoming: FileList | File[] | null) => {
    if (!incoming) return;
    const fileArray = Array.from(incoming);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  // Drag-and-drop handlers and overlay state
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);
    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  const removeFile = (fileToRemove: File) => {
    setFiles((prev) => prev.filter(f => !(f.name === fileToRemove.name && f.lastModified === fileToRemove.lastModified)));
  };

  const clearFiles = () => setFiles([]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if ((!input.trim() && files.length === 0) || disabled) return;
    // BACKEND TEAM: handle file upload API here
    // Files currently stored in frontend state only
    onSendMessage(input.trim());
    setInput("");
    clearFiles();
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
    <div className="p-4 bg-transparent transition-colors duration-300">
      <style>{`
        textarea::placeholder {
          color: ${t.mutedText} !important;
          opacity: 0.6;
        }
      `}</style>
      {/* Drag overlay: only show when dragging files */}
      {isDragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none select-none">
          <div className="w-full h-full absolute top-0 left-0 transition-colors duration-300" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <span className="text-lg font-medium text-center" style={{ color: "#E5E7EB" }}>Drop files to attach</span>
              <FileIcon size={32} className="hidden md:inline-block ml-3" style={{ color: t.primary }} />
            </div>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto relative group">
        <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" style={{ background: `linear-gradient(to right, ${t.primary}33, ${t.primaryHover}33)` }}></div>
        <div 
          className="relative backdrop-blur-xl rounded-2xl flex flex-col p-2 shadow-lg transition-colors duration-300"
          style={{ backgroundColor: `${t.inputBg}E6`, border: `1px solid ${t.border}` }}
        >
          {/* File Preview Chips */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {files.map((file) => (
                <div
                  key={file.name + file.lastModified}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300"
                  style={{ backgroundColor: t.hoverBg }}
                >
                  <FileIcon size={14} style={{ color: t.primary }} />
                  <span className="text-sm truncate max-w-[120px] transition-colors duration-300" style={{ color: t.text }}>
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(file)}
                    className="p-1 rounded-md transition-colors"
                    style={{ color: t.mutedText }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = t.text; e.currentTarget.style.backgroundColor = t.card; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = t.mutedText; e.currentTarget.style.backgroundColor = "transparent"; }}
                    title="Remove file"
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
              className="p-3 transition-colors rounded-xl hover:scale-105"
              style={{ color: t.mutedText }}
              onMouseEnter={(e) => { e.currentTarget.style.color = t.primary; e.currentTarget.style.backgroundColor = t.hoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = t.mutedText; e.currentTarget.style.backgroundColor = "transparent"; }}
              title="Attach file"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              multiple
              onChange={e => {
                handleFiles(e.target.files);
                e.target.value = '';
              }}
              tabIndex={-1}
            />
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Broq..."
              className="flex-1 max-h-[200px] min-h-[44px] bg-transparent resize-none py-3 px-2 focus:outline-none custom-scrollbar leading-relaxed break-words overflow-hidden transition-colors duration-300"
              style={{ color: t.text }}
              rows={1}
              disabled={disabled}
            />
            <button
              onClick={handleSend}
              disabled={(!input.trim() && files.length === 0) || disabled}
              className={`p-3 rounded-xl ml-2 transition-all duration-200 flex items-center justify-center ${(!input.trim() && files.length === 0) || disabled ? "" : "hover:scale-105"}`}
              style={{ 
                backgroundColor: (input.trim() || files.length > 0) && !disabled ? t.primary : t.hoverBg,
                color: (input.trim() || files.length > 0) && !disabled ? "#FFFFFF" : t.mutedText,
                boxShadow: (input.trim() || files.length > 0) && !disabled ? `0 4px 6px -1px ${t.primary}33` : "none"
              }}
              onMouseEnter={(e) => { 
                if ((input.trim() || files.length > 0) && !disabled) {
                  e.currentTarget.style.backgroundColor = t.primaryHover;
                }
              }}
              onMouseLeave={(e) => {
                if ((input.trim() || files.length > 0) && !disabled) {
                  e.currentTarget.style.backgroundColor = t.primary;
                }
              }}
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

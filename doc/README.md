# Broq Chat UI

A modern, ChatGPT-like chat interface built with React and Tailwind CSS. Broq Chat UI provides a clean, responsive, and extensible chat experience with advanced file upload capabilities.

## Overview
Broq Chat UI is designed for conversational AI and chat applications. It features a sleek, minimal interface, robust file upload (drag-and-drop and attachment button), and a focus on usability and extensibility.

## Features
- Chat system with user and assistant messages
- Drag & drop file upload (with preview)
- Attachment button for manual file selection
- Responsive, mobile-friendly layout
- Animated message transitions
- Modern, accessible design
- Lucide icons for UI clarity
- Auto-resizing input box

## UI Features
- File preview chips above input (ChatGPT-like)
- Clean, modern chat layout
- Stable file upload feedback
- Remove files before sending

## Tech Stack
- React
- Tailwind CSS
- Lucide Icons
- Vite (build tool)

## Folder Structure
```
src/
  components/      # UI components (ChatInput, ChatWindow, etc.)
  hooks/           # Custom React hooks (useChat, useDragAndDrop)
  layout/          # Layout components
  services/        # Service logic (chatService)
  types/           # TypeScript types
public/
doc/               # Project and internal documentation
```

## How File Upload Works
- **Drag & Drop:** Drag files into the chat area to preview and upload. The system handles multiple files and previews them before sending.
- **Attachment Button:** Click the paperclip icon to open the file picker. Selected files are handled by the same logic as drag-and-drop, ensuring a unified upload experience.

## File Upload System (Detailed)

- **Unified State:**
  - All uploaded files (drag or attachment) are stored in a single React state: `const [files, setFiles] = useState([]);`
  - Both drag-and-drop and attachment button update this state using a shared handler.

- **Drag & Drop Flow:**
  - User drags files onto the chat area.
  - Files are normalized and added to the state using functional updates.
  - UI updates instantly to show file chips.

- **Attachment Button Flow:**
  - Clicking the paperclip opens a hidden file input.
  - Selected files are normalized and added to the same state.
  - Input is reset after each selection to allow re-uploading the same file.

- **File Preview Chips:**
  - Files are displayed as rounded chips above the input.
  - Each chip shows file name and a remove (✕) button.
  - Chips use stable keys: `file.name + file.lastModified`.

- **Removal:**
  - User can remove any file before sending.
  - Files are only cleared after sending a message or manual removal.

## Future Improvements
- File preview thumbnails (images, PDFs, etc.)
- Upload progress bar
- Backend integration for file/message persistence
- Markdown rendering for messages
- Enhanced accessibility

## Bug Fixes

- **File inconsistency issue:**
  - *Root cause:* Multiple file states, stale state updates, and missing input reset caused files to sometimes not appear or disappear.
  - *Fix:* Unified file state, always use functional updates, reset file input after selection, and use stable keys for rendering.

## Best Practices Used
- Functional state updates to avoid stale state bugs
- Stable keys for file rendering
- File input reset trick for consistent selection
- Single source of truth for file state

## How to Add New UI Elements
1. Never hardcode colors
2. Import theme styles: `import { useTheme } from "../App";` and `import { styles } from "../theme";`
3. Use `const { activeTheme } = useTheme(); const t = styles[activeTheme];`
4. Apply colors via inline styles: `style={{ backgroundColor: t.bg, color: t.text }}`

---

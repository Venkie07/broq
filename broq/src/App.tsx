import { MainLayout } from "./layout/MainLayout";
import { ChatWindow } from "./components/ChatWindow";
import { ChatInput } from "./components/ChatInput";
import { useChat } from "./hooks/useChat";
import { useDragAndDrop } from "./hooks/useDragAndDrop";

function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const { isDragging, draggedFiles, removeFile, clearFiles } = useDragAndDrop();

  return (
    <MainLayout isDragging={isDragging}>
      <ChatWindow messages={messages} isLoading={isLoading} />
      <div className="shrink-0 bg-gradient-to-t from-[#0F0D17] via-[#0F0D17]/95 to-transparent pt-6 pb-2">
        <ChatInput 
          onSendMessage={sendMessage} 
          disabled={isLoading} 
          draggedFiles={draggedFiles}
          removeFile={removeFile}
          clearFiles={clearFiles}
        />
      </div>
    </MainLayout>
  );
}

export default App;

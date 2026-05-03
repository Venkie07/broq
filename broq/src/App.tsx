import { MainLayout } from "./layout/MainLayout";
import { ChatWindow } from "./components/ChatWindow";
import { ChatInput } from "./components/ChatInput";
import { useChat } from "./hooks/useChat";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import React, { createContext, useContext, useState, useEffect } from "react";
import { styles } from "./theme";
import Settings from "./components/settings";


// Theme context
type ThemeType = "light" | "dark" | "system";
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  activeTheme: "light" | "dark";
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  activeTheme: "dark",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

const App: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const { isDragging } = useDragAndDrop();
  const [view, setView] = useState<"chat" | "settings">("chat");
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("broq-theme");
    return (saved as ThemeType) || "system";
  });
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme());

  useEffect(() => {
    localStorage.setItem("broq-theme", theme);
  }, [theme]);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const activeTheme: "light" | "dark" = theme === "system" ? systemTheme : theme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
      <div
        className="transition-colors duration-300"
        style={{
          backgroundColor: styles[activeTheme].bg,
          color: styles[activeTheme].text,
          minHeight: "100vh",
        }}
      >
        {view === "chat" ? (
          <MainLayout isDragging={isDragging} theme={activeTheme} onOpenSettings={() => setView("settings")}>
            <ChatWindow messages={messages} isLoading={isLoading} />
              <div
                className="shrink-0 pt-6 pb-2"
                style={{
                  background: `linear-gradient(to top, ${styles[activeTheme].bg} 60%, transparent)`
                }}
              >
              <ChatInput
                onSendMessage={sendMessage}
                disabled={isLoading}
              />
            </div>
          </MainLayout>
        ) : (
          <Settings 
            theme={theme} 
            setTheme={setTheme} 
            onBack={() => setView("chat")} 
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;

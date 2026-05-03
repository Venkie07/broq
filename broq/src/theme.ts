export type ThemeColors = {
  bg: string;
  text: string;
  card: string;
  primary: string;
  primaryHover: string;
  border: string;
  sidebarBg: string;
  inputBg: string;
  subtext: string;
  hoverBg: string;
  mutedText: string;
};

export const styles: Record<"light" | "dark", ThemeColors> = {
  light: {
    bg: "#FFFFFF",
    text: "#111827",
    card: "#F9FAFB",
    primary: "#A855F7",
    primaryHover: "#9333EA",
    border: "#E5E7EB",
    sidebarBg: "#F3F4F6",
    inputBg: "#FFFFFF",
    subtext: "#6B7280",
    hoverBg: "#E5E7EB",
    mutedText: "#9CA3AF",
  },
  dark: {
    bg: "#0F0D17",
    text: "#E5E7EB",
    card: "#1C1A25",
    primary: "#7C3AED",
    primaryHover: "#6D28D9",
    border: "rgba(255, 255, 255, 0.05)",
    sidebarBg: "#12101A",
    inputBg: "#1C1A25",
    subtext: "#9CA3AF",
    hoverBg: "rgba(255, 255, 255, 0.05)",
    mutedText: "#9CA3AF",
  },
};

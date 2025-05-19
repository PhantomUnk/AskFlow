import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  currentTheme: string;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("is-dark");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("is-dark", JSON.stringify(newTheme));
    setIsDark(newTheme);
  };

  useEffect(() => {
    document.documentElement.style.background = isDark ? "#1a1a1a" : "#f7fafc";
  }, [isDark]);

  const currentTheme = isDark ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

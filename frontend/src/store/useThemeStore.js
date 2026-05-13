// src/store/useThemeStore.js
import { create } from "zustand";

const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("chat-theme");
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
};

const initialTheme = getSystemTheme();
if (typeof document !== "undefined") {
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const useThemeStore = create((set) => ({
  theme: initialTheme,

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("chat-theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { theme: newTheme };
    }),

  setTheme: (newTheme) => {
    localStorage.setItem("chat-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    set({ theme: newTheme });
  },
}));

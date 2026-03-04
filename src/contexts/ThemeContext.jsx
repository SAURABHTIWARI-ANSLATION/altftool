"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => { },
});

const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('theme') === 'dark') return 'dark';
    if (params.get('theme') === 'light') return 'light';
  }
  return "light"; // Default to light mode for the standalone app to prevent unexpected black screens
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isManual, setIsManual] = useState(false);
  const [mounted, setMounted] = useState(false);




  // Initial load: system → stored manual
  useEffect(() => {
    const storedTheme = localStorage.getItem("appTheme");
    const storedManual = localStorage.getItem("themeManual") === "true";

    if (storedTheme && storedManual) {
      setTheme(storedTheme);
      setIsManual(true);
    } else {
      setTheme(getSystemTheme());
    }
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen to OS/Url changes ONLY if not manual
  useEffect(() => {
    if (isManual) return;
    const handleUrlTheme = () => setTheme(getSystemTheme());
    window.addEventListener("popstate", handleUrlTheme);
    return () => window.removeEventListener("popstate", handleUrlTheme);
  }, [isManual]);

  // Always listen for iframe postMessage from parent Altf-prep app
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === "THEME_CHANGE") {
        setTheme(event.data.theme === "dark" ? "dark" : "light");
        setIsManual(true); // Treat as manually set
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const toggleTheme = () => {
    setIsManual(true);

    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("appTheme", next);
      localStorage.setItem("themeManual", "true");
      return next;
    });
  };

  // Broadcast iframe height to prevent double scrollbars in parent
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent !== window) {
      const sendHeight = () => {
        // Compute exact content height instead of full scroll area which sometimes leaves huge gaps
        const height = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        window.parent.postMessage({ type: "RESIZE_IFRAME", height }, "*");
      };

      sendHeight();

      const resizeObserver = new ResizeObserver(() => sendHeight());
      resizeObserver.observe(document.body);

      const mutationObserver = new MutationObserver(() => sendHeight());
      mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import { useEffect, useState } from "react";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null); // null = not initialized yet

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "color") {
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  // Apply theme class and persist it
  useEffect(() => {
    if (!theme) return; // wait until theme is loaded

    document.body.classList.remove("light", "dark-mode", "color-mode");

    if (theme === "light") {
      document.body.classList.add("light");
    } else if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else if (theme === "color") {
      document.body.classList.add("color-mode");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Prevent initial render until theme is loaded (optional but avoids flicker)
  if (!theme) return null;

  return <Component {...pageProps} theme={theme} setTheme={setTheme} />;
}

export default MyApp;

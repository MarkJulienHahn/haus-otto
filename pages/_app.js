import { useEffect, useState } from "react";
import "../styles/globals.css";

import Layout from "./layout.js";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/about");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "color") {
      setTheme(storedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!theme) return;

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
  if (!theme) return null;

  return (
    <Layout data={data} setTheme={setTheme} theme={theme}>
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </Layout>
  );
}

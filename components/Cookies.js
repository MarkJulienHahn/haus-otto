import { useState, useEffect } from "react";
import styles from "../styles/cookies.module.css";
import Link from "next/link";

const Cookies = () => {
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(0);

  const cookieFunction = () => {
    setSeen(true), localStorage.setItem('seen', true);
  }

  useEffect(() => {
    const data = localStorage.getItem("seen");
    setSeen(data)
  })

  const hover = {
    color: "white",
    background: "black",
  };

  const unHover = {
    color: "black",
    background: "none",
  };

  return (
    <>
      {!seen && (
        <div className={styles.cookieWrapper}>
          This website uses cookies. If you continue to use the website, we will
          assume that you agree.{" "}
          <span
            className={styles.cookieButton}
            style={active == 0 ? hover : unHover}
            onMouseEnter={() => setActive(0)}
            onClick={() => cookieFunction()}
          >
            Yes
          </span>
          <span
            className={styles.cookieButton}
            style={active == 1 ? hover : unHover}
            onMouseEnter={() => setActive(1)}
            onClick={() => cookieFunction()}
          >
            No
          </span>
          <span
            className={styles.cookieButton}
            style={active == 2 ? hover : unHover}
            onMouseEnter={() => setActive(2)}
          >
            <Link href={"/imprint"}>More</Link>
          </span>
        </div>
      )}
    </>
  );
};

export default Cookies;

import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

const Header = ({ theme, setTheme, data }) => {
  const [portrait, showPortrait] = useState(false);
  const router = useRouter();

  const home = router.pathname === "/";
  const about = router.pathname === "/about";

  return (
    <>
      {portrait && data && (
        <div className={styles.portraitOverlay}>
          <Image
            src={data[0]?.portrait.url}
            width={data[0]?.portrait.dimensions.width}
            height={data[0]?.portrait.dimensions.height}
            layout="fill"
            objectFit="contain"
            loading="eager"
            priority="true"
          />
        </div>
      )}

      <div className={styles.headerLeftWrapper}>
        <div className={styles.headerPageIndex}>
          <div
            className={`${styles.menuItem} ${styles.menuItemRight} ${
              home ? styles.menuItemActive : ""
            }`}
          >
            <Link href={"/"}>
              <a>Haus Otto</a>
            </Link>
          </div>
        </div>
        <div
          onMouseEnter={() => showPortrait(true)}
          onMouseLeave={() => showPortrait(false)}
          className={`${styles.menuItem} ${about && styles.menuItemActive}`}
        >
          <Link href={"/about"}>
            <a>Info</a>
          </Link>
        </div>
      </div>
      {home && (
        <div className={styles.headerRight}>
          {theme != "light" && (
            <div
              className={styles.colorSwitch}
              onClick={() => setTheme("light")}
              style={{ background: "white" }}
            />
          )}
          {theme != "dark" && (
            <div
              className={styles.colorSwitch}
              onClick={() => setTheme("dark")}
              style={{ background: "black" }}
            />
          )}
          {theme != "color" && (
            <div
              className={styles.colorSwitch}
              onClick={() => setTheme("color")}
              style={{ background: "#af7653" }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;

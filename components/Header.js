import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

const Header = ({ setTheme, data }) => {
  const [portrait, showPortrait] = useState(false);
  const router = useRouter();

  const landing = router.query.landing;
  const about = router.pathname == "/about";

  return (
    <>
      {portrait && (
        <div className={styles.portraitOverlay}>
          <Image
            src={data.portrait.url}
            width={data.portrait.dimensions.width}
            height={data.portrait.dimensions.height}
            layout="fill"
            objectFit="contain"
            loading="eager"
            priority="true"
          />
        </div>
      )}

      <div className={styles.headerWrapper}>
        <div className={styles.headerLeftWrapper}>
          <div
            className={styles.headerPageIndex}
            // onClick={() => setActiveIndex(null)}
          >
            <div
              className={`${styles.menuItem} ${
                landing == "true" && styles.menuItemActive
              }`}
              onClick={() =>
                router.push(`/?landing=true`, undefined, { shallow: true })
              }
            >
              Haus Otto
            </div>
          </div>
          <div
            onMouseEnter={
              data?.portrait ? () => showPortrait(true) : () => {}
            }
            onMouseLeave={
              data?.portrait ? () => showPortrait(false) : () => {}
            }
            className={`${styles.menuItem} ${about && styles.menuItemActive}`}
          >
            <Link href={"/about"}>
              <a>About</a>
            </Link>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div
            className={styles.colorSwitch}
            onClick={() => setTheme("light")}
            style={{ background: "white" }}
          />
          <div
            className={styles.colorSwitch}
            onClick={() => setTheme("dark")}
            style={{ background: "black" }}
          />
          <div
            className={styles.colorSwitch}
            onClick={() => setTheme("color")}
            style={{ background: "#af7653" }}
          />
          <div
            className={`${styles.indexButton} ${styles.menuItem} ${
              landing !== "true" && !about && styles.menuItemActive
            }`}
            onClick={() => router.push(`/`, undefined, { shallow: true })}
          >
            Index
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = ({ activeIndex, setActiveIndex, data }) => {
  const [portrait, showPortrait] = useState(false);

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

      <div
        className={styles.headerWrapper}
        style={activeIndex != null ? { borderBottom: "var(--border)" } : {}}
      >
        <div className={styles.headerLeftWrapper}>
          <div
            className={styles.headerPageIndex}
            onClick={() => setActiveIndex(null)}
          >
            <div style={{ cursor: "pointer" }}>Haus Otto</div>
          </div>
          <div
            onMouseEnter={() => showPortrait(true)}
            onMouseLeave={() => showPortrait(false)}
          >
            <Link href={"/about"}>
              <a>About</a>
            </Link>
          </div>
        </div>

        <div className={styles.headerRightWrapper}>
          <h2>Case</h2>

          <h2>Year</h2>
          <h2>Presskit</h2>
        </div>
      </div>
    </>
  );
};

export default Header;

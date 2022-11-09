import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = ({ activeIndex, data }) => {
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

      <div className={styles.headerWrapper}>
        <div className={styles.headerTopWrapper}>
          <Link href={"/"}>
            <a>Haus Otto</a>
          </Link>
          <div
            onMouseEnter={() => showPortrait(true)}
            onMouseLeave={() => showPortrait(false)}
          >
            <Link href={"/about"}>
              <a>About</a>
            </Link>
          </div>
        </div>
        <div
          className={styles.headerBottomWrapper}
          style={activeIndex != null ? { borderBottom: "2px solid black" } : {}}
        >
          <h2>Work</h2>
          <div className={styles.headerBottomLeft}>
            <h2>Case</h2>
            <h2>Year</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

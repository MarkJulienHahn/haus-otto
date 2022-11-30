import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

const HeaderAbout = ({data}) => {
  const [portrait, showPortrait] = useState(false);

  return (
    <>
      {portrait && (
        <div className={styles.portraitOverlay}>
          <Image
            src={data.portrait?.url}
            width={data.portrait?.dimensions.width}
            height={data.portrait?.dimensions.height}
            layout="fill"
            objectFit="contain"
            loading="eager"
            priority="true"
          />
        </div>
      )}

      <div className={styles.headerWrapper}>
        <div className={styles.headerLeftWrapper}>
          <Link href={"/"}>
            <div style={{ cursor: "pointer" }}>Haus Otto</div>
          </Link>
          <div
            onMouseEnter={() => showPortrait(true)}
            onMouseLeave={() => showPortrait(false)}
          >
            <a className={styles.headerPageIndex}>About</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAbout;

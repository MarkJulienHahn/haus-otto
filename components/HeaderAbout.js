import { useState } from "react";

import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

const HeaderAbout = ( data ) => {
  const [portrait, showPortrait] = useState(false);

  return (
    <>
      {portrait && (
        <div className={styles.portraitOverlay}>
          <Image
            src={data.data.portrait.url}
            width={data.data.portrait.dimensions.width}
            height={data.data.portrait.dimensions.height}
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
        <div className={styles.headerAboutBottomWrapper}>
          <h2 className={styles.headerAboutHeader}>About</h2>
          <div className={styles.headerSelectedPress}>
            <h2>Selected Press</h2>
          </div>

          <div className={styles.headerAboutTop}>
            <h2>Upcoming Shows</h2>
            <h2>Year</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAbout;

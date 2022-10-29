import styles from "../styles/Header.module.css";
import Link from "next/link";

const HeaderAbout = () => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTopWrapper}>
          <Link href={"/"}>
            <a>Haus Otto</a>
          </Link>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
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

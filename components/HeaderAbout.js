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
        <div className={styles.headerBottomWrapperAbout}>
          <h2>About</h2>
          <h2>Selected Press</h2>
          <div className={styles.headerAboutBottomLeft}>
            <h2>Upcoming Shows</h2>
            {/* <h2>Year</h2> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAbout;

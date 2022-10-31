import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = ({ activeIndex }) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerTopWrapper}>
        <Link href={"/"}>
          <a>Haus Otto</a>
        </Link>

        <Link href={"/about"}>
          <a>About</a>
        </Link>
      </div>
      <div className={styles.headerBottomWrapper} style={activeIndex != null ? {borderBottom: "2px solid black"}: {}}>
        <h2>Work</h2>
        <div className={styles.headerBottomLeft}>
          <h2>Case</h2>
          <h2>Year</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;

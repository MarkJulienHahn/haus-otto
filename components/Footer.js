
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const FooterAbout = () => {
  return (
    <>
      <div className={styles.footerHomeWrapper}>
        <Link href="/imprint">Imprint</Link>
        <div>©H-O 2025 V1.2-DE</div>
      </div>
    </>
  );
};

export default FooterAbout;

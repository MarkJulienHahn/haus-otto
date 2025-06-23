import Link from "next/link";
import styles from "../styles/Footer.module.css";

const FooterAbout = () => {
  return (
    <>
      <div className={styles.footerHomeWrapper}>
        ©H-O 2025 V1.2-DE{" "}
        <span className={styles.footerMobileImprint}>
          <Link href="/imprint">Imprint</Link>
        </span>
      </div>
      <div className={styles.footerHomeImprint}>
        <Link href="/imprint">Imprint</Link>
      </div>
    </>
  );
};

export default FooterAbout;

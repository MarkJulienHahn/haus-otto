
import styles from "../styles/Footer.module.css";

const FooterAbout = () => {
  return (
    <>
      <div className={styles.footerHomeWrapper}>© Haus Otto GmbH {new Date().getFullYear()}</div>
    </>
  );
};

export default FooterAbout;

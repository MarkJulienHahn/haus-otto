import { useState } from "react";
import styles from "../styles/about.module.css";

export default function AboutAccordion({ content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`${styles.list} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.menuItem}>
          <h2 style={{ paddingBottom: "6px" }}>Past Exhibitions</h2>
        </div>
        <div className={styles.entries}>
          {content?.map((show, i) => (
            <div className={styles.aboutEntry} key={i}>
              <h2>{show.title}</h2>
              <h2>{show.year}</h2>
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles.toggleButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "−" : "+"}
      </div>
    </>
  );
}

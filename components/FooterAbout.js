import { useState } from "react";

import styles from "../styles/Footer.module.css";

import { PortableText } from "@portabletext/react";

const FooterAbout = ({data}) => {
  const [showImprint, setShowImprint] = useState(false);

  console.log

  return (
    <>
      {showImprint && (
        <div className={styles.imprintWrapper}>
          <div className={styles.imprintTop}>
          <PortableText value={data.kontaktNils} />
          <PortableText value={data.kontaktPatrick} />
            <p>©{new Date().getFullYear()}</p>
          </div>
          <PortableText value={data.imprint} />
        </div>
      )}

      <div className={styles.footerTop}>
        <div className={styles.footerTopCol1}>
          <h2>Contact</h2>
          <PortableText value={data.contact} />
        </div>
        <div className={styles.footerTopCol2}>
          <h2>Mail</h2>
          <p>
            <a href={`mailto:${data.mail}`}>{data.mail}</a>
          </p>
          <h2>Phone</h2>
          <p>{data.phone}</p>
        </div>
        <div className={styles.footerTopCol3}>
          <h2>Instagram</h2>
          <p>
            <a href={data.instagram} target="_blank" rel="noreferrer">@haus.otto</a>
          </p>
        </div>
      </div>
      <div className={styles.footerImprintButton} onClick={() => setShowImprint(!showImprint)}>Imprint</div>
      <div className={styles.footerWrapper}>© Haus Otto GmbH {new Date().getFullYear()}</div>
    </>
  );
};

export default FooterAbout;

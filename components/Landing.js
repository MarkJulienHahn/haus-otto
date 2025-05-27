import { useEffect } from "react";

import { useRouter } from "next/router";
import styles from "../styles/landing.module.css";
import Image from "next/image";

export default function Landing({ landing }) {
  const router = useRouter();
  const showLanding = router.query.landing === "true";

  useEffect(() => {
    if (showLanding) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // html
      document.body.style.position = "fixed"; // prevent iOS bounce
      document.body.style.width = "100%"; // ensure no shift
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showLanding]);

  return (
    <div
      onClick={() => router.push(`/`, undefined, { shallow: true })}
      className={`${styles.wrapper} ${showLanding ? "" : styles.hidden}`}
    >
      {landing.headlineType == "text" ? <h1>{landing.headlineText}</h1> : ""}
      {landing.headlineType == "image" ? (
        <div className={styles.imageWrapper}>
          <Image src={landing.imageUrl.url} layout="fill" objectFit="contain" />
        </div>
      ) : (
        ""
      )}{" "}
      {landing.headlineType === "video" ? (
        <div className={styles.imageWrapper}>
          <iframe
            src={`https://player.vimeo.com/video/${landing.headlineVideoUrl}/?background=true`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo video"
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

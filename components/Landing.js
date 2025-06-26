import { useState, useEffect, useRef } from "react";
import styles from "../styles/landing.module.css";
import Image from "next/image";

export default function Landing({ landing }) {
  const landingRef = useRef();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const section = landingRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper} ref={landingRef} onClick={handleClick}>
      {landing.headlineType === "text" && <h1>{landing.headlineText}</h1>}

      {landing.headlineType === "image" && (
        <div className={styles.imageWrapper}>
          <Image src={landing.imageUrl.url} layout="fill" objectFit="contain" />
        </div>
      )}

      {landing.headlineType === "video" && (
        <div className={styles.imageWrapper}>
          <iframe
            src={`https://player.vimeo.com/video/${landing.headlineVideoUrl}/?background=true`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo video"
          />
        </div>
      )}

      <div
        className={styles.scrollHelper}
        style={{ display: atTop ? "block" : "none" }}
      />
    </div>
  );
}

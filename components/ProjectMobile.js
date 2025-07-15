import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ProjectActiveMobile from "./ProjectActiveMobile";
import SwiperInner from "./SwiperInner";

import styles from "../styles/project.module.css";
import "swiper/css";

const ProjectMobile = ({
  setActiveIndex,
  activeIndex,
  title,
  year,
  index,
  description,
  photography,
  presskit,
  client,
  images,
  slug,
}) => {
  const [active, setActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [swiperINDX, setSwiperINDX] = useState(1);

  const aboutSection = useRef(null);
  const projectRef = useRef(null);
  const router = useRouter();

  const open = async () => {
    setActiveIndex(index);
    await router.push(`?project=${slug}`, undefined, { shallow: true });
    // Scrolling now handled in useEffect
  };

  const close = async () => {
    await router.replace(router.pathname, undefined, {
      shallow: true,
    });
    setActiveIndex(null);
    setShowIndex(false);
  };

  useEffect(() => {
    const isActive = index === activeIndex;
    setActive(isActive);

    if (isActive && aboutSection.current) {
      const scrollToSection = () => {
        setTimeout(
          aboutSection.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
          500
        );
      };

      // Wait for two animation frames to ensure layout is stable
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          scrollToSection();
        });
      });

      return () => {
        cancelAnimationFrame(frame1);
      };
    }
  }, [activeIndex]);

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const hasProjectQuery = !!router.query.project;
  //   if (!hasProjectQuery) return;

  //   const timeout = setTimeout(() => {
  //     projectRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, []);

  const archiveAction = (indx) => {
    setSwiperINDX(indx);
    setShowIndex(false);
  };

  return (
    <div>
      <div ref={projectRef}></div>
      <div
        className={styles.MBprojectSingleWrapper}
        style={{ opacity: !active && activeIndex != null ? "0.3" : "1" }}
        onClick={
          active
            ? undefined
            : () => {
                open();
              }
        }
        id={index}
      >
        <div ref={aboutSection} className={styles.MBScrollAnchor} />
        <div
          className={styles.MBHeader}
          onClick={
            active
              ? () => {
                  close();
                }
              : undefined
          }
        >
          <div
            style={
              active
                ? {
                    background: "var(--bg-color)",
                    // color: "var(--bg-color)",
                    height: "36px",
                    padding: "0 8px",
                    transform: "translateX(-8px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {title}
          </div>
          {/* <div className={styles.MBHeaderLeft}>
            <p>{year}</p>
          </div> */}
          <div className={styles.MBHeaderLeft}>
            <p>{client}</p>
            <p>{year}</p>
          </div>
        </div>

        <div className={styles.MBAccordion}>
          {active && showIndex ? (
            <div className={styles.MBArchiveWrapper}>
              {images.map((image, i) => (
                <div className={styles.MBArchiveColumn} key={i}>
                  <Image
                    src={image.url}
                    objectPosition="left top"
                    objectFit="contain"
                    width={100}
                    height={100}
                    onClick={() => archiveAction(i + 1)}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ) : (
            <SwiperInner
              setCurrentSlide={setCurrentSlide}
              swiperINDX={swiperINDX}
              active={active}
              images={images}
            />
          )}

          {active && (
            <div className={styles.MBControls}>
              <p onClick={() => setShowIndex(!showIndex)}>
                {showIndex ? "Slideshow" : "Index"}
              </p>
              <p>{!showIndex && `${currentSlide + 1} / ${images.length}`}</p>
            </div>
          )}

          <ProjectActiveMobile
            description={description}
            client={client}
            photography={photography}
            presskit={presskit}
            active={active}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectMobile;

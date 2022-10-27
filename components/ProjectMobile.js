import React, { useState, useEffect, useRef, useCallback } from "react";

import ProjectActive from "./ProjectActive";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperInner from "./SwiperInner";

import "swiper/css";

import Image from "next/image";

import styles from "../styles/project.module.css";

const ProjectMobile = ({
  setActiveIndex,
  activeIndex,
  title,
  category,
  year,
  index,
  description,
  photography,
  presskit,
  client,
  images,
}) => {
  const [active, setActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [swiperINDX, setSwiperINDX] = useState(1);

  const aboutSection = useRef(null);

  const scrollDown = () => {
    window.scrollTo({
      top: aboutSection.current.offsetTop - 65.5,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    index === activeIndex ? setActive(true) : setActive(false);
  }, [activeIndex]);

  const archiveAction = (indx) => {
    setSwiperINDX(indx), setShowIndex(false);
  };

  return (
    <>
      <div
        className={styles.MBprojectSingleWrapper}
        onClick={
          active
            ? () => {}
            : () => {
                setActiveIndex(index), setTimeout(scrollDown, 500);
              }
        }
        ref={aboutSection}
      >
        <div
          className={styles.MBHeader}
          onClick={active ? () => setActiveIndex(null) : () => {}}
        >
          <div
            style={
              active
                ? {
                    background: "black",
                    color: "white",
                    height: "36px",
                    padding: "0 8px",
                    marginLeft: "4px",
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
          <div className={styles.MBHeaderLeft}>
            <p>{category}</p>
            <p>{year}</p>
          </div>
        </div>

        <div className={styles.MBAccordion}>
          {active && showIndex ? (
            <div className={styles.MBArchiveWrapper}>
              <div className={styles.MBArchiveColumn}>
                {images.map((image, i) => (
                  <div className={styles.MBArchiveColumn} key={i}>
                    <Image
                      src={image.url}
                      // layout="responsive"
                      // objectFit="contain"
                      objectPosition="left top"
                      width={image.dimensions.width}
                      height={image.dimensions.height}
                      onClick={() => archiveAction(i+1)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <SwiperInner
              setCurrentSlide={setCurrentSlide}
              swiperINDX={swiperINDX}
              active={active}
              images={images}
            />
          )}

          {active ? (
            <div className={styles.MBControls}>
              <p onClick={() => setShowIndex(!showIndex)}>
                {showIndex ? "Slideshow" : "Index"}
              </p>
              <p>{!showIndex && `${currentSlide + 1} / ${images.length}`}</p>
            </div>
          ) : (
            ""
          )}
          <ProjectActive
            description={description}
            client={client}
            photography={photography}
            presskit={presskit}
            active={active}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectMobile;

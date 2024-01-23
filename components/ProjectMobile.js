import React, { useState, useEffect, useRef, useCallback } from "react";

import ProjectActiveMobile from "./ProjectActiveMobile";
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
      top: aboutSection.current.offsetTop + 21,
      left: 0,
      behavior: "smooth",
    });
  };

  // const scrollDown = () => {
  //   aboutSection.current.scrollIntoView() + 40
  // };

  const scrollUp = () => {
    window.scrollTo({
      top: 9999,
      left: 0,
      behavior: "smooth",
    });
  };

  const open = async () => {
    setActiveIndex(index), setTimeout(scrollDown, 200);
  };

  const close = async () => {
    setActiveIndex(null), await setTimeout(scrollUp, 500);
  };

  useEffect(() => {
    index === activeIndex ? setActive(true) : setActive(false);
  }, [activeIndex]);

  useEffect(() => {
    setTimeout(scrollUp, 500);
  }, []);

  const archiveAction = (indx) => {
    setSwiperINDX(indx), setShowIndex(false);
  };

  return (
    <div>
      <div
        className={styles.MBprojectSingleWrapper}
        onClick={
          active
            ? () => {}
            : () => {
                open();
              }
        }
        style={index == 0 && activeIndex !== null ? { border: 0 } : {}}
        id={index}
        ref={aboutSection}
      >
        <div
          className={styles.MBHeader}
          onClick={
            active
              ? () => {
                  close();
                }
              : () => {}
          }
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
              {images.map((image, i) => (
                <div className={styles.MBArchiveColumn} key={i}>
                  <Image
                    src={image.url}
                    objectPosition="left top"
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    onClick={() => archiveAction(i + 1)}
                    loading="lazy"
                    // priority={i<5 ? "true" : "false"}
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
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

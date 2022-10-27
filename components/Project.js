import React, { useState, useEffect, useRef } from "react";

import ProjectActive from "./ProjectActive";
import MouseElement from "./MouseElement";

import Image from "next/image";

import styles from "../styles/project.module.css";

const Project = ({
  setActiveIndex,
  activeIndex,
  title,
  category,
  year,
  index,
  previewImage,
  description,
  photography,
  presskit,
  client,
  images,
}) => {
  const [active, setActive] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [mouseLable, setMouseLable] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

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

  const loopImages = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex(imgIndex + 1);
    } else setImgIndex(0);
  };

  const showImage = (indx) => {
    setShowIndex(false), setImgIndex(indx);
  };

  const imageArray = images.map((image, i) => (
    <span key={i}>
      <Image
        key={i}
        src={image.url}
        layout="fill"
        objectFit="contain"
        objectPosition="left top"
        loading="eager"
        onMouseEnter={() => setMouseLable(true)}
        onMouseLeave={() => setMouseLable(false)}
      />
    </span>
  ));

  return (
    <>
      {mouseLable && (
        <MouseElement imgIndex={imgIndex + 1} length={images.length} />
      )}

      <div
        className={styles.projectSingleWrapper}
        onClick={
          active
            ? () => {}
            : () => {
                setActiveIndex(index)
                // , setTimeout(scrollDown, 500);
              }
        }
        ref={aboutSection}
      >
        {activeIndex === null && (
          <div className={styles.projectOverlay}>
            <Image
              src={previewImage.url}
              layout="fill"
              objectFit="contain"
              loading="eager"
              priority="true"
            />
          </div>
        )}

        {active && !showIndex && (
          <div
            className={styles.slider}
            onClick={() => {
              loopImages();
            }}
          >
            {imageArray[imgIndex]}
          </div>
        )}

        {active && showIndex && (
          <div className={styles.archiveWrapper}>
            {images.map((image, i) => (
              <div className={styles.archiveColumn} key={i}>
                <Image
                  src={image.url}
                  layout="responsive"
                  objectFit="contain"
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  onClick={() => showImage(i)}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.projectColumnLeft}>
          <div className={styles.projectHeader}>
            <h1
              style={active ? { background: "black", color: "white" } : {}}
              onClick={active ? () => setActiveIndex(null) : () => {}}
            >
              &nbsp;{title}&nbsp;
            </h1>
            {active && (
              <h2 onClick={() => setShowIndex(!showIndex)}>
                {active && !showIndex && "Index"}
                {active && showIndex && "Slideshow"}
              </h2>
            )}
          </div>
          <ProjectActive
            description={description}
            client={client}
            photography={photography}
            presskit={presskit}
            active={active}
          />
        </div>
        <div className={styles.projectColumnRight}>
          <div className={styles.projectHeaderRight}>
            <h1>{category}</h1>
            <h1>{year}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;

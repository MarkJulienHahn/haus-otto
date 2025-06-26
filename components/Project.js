import { useState, useEffect, useRef } from "react";

import ProjectActive from "./ProjectActive";
import MouseElement from "./MouseElement";

import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/project.module.css";

const Project = ({
  setActiveIndex,
  activeIndex,
  title,
  categories,
  year,
  index,
  previewImage,
  description,
  photography,
  presskit,
  client,
  images,
  slug,
}) => {
  const [active, setActive] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [mouseLable, setMouseLable] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  const aboutSection = useRef(null);
  const router = useRouter();

  useEffect(() => {
    index === activeIndex ? setActive(true) : setActive(false);
  }, [activeIndex]);

  const loopImages = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex(imgIndex + 1);
    } else setImgIndex(0);
  };

  const loopImagesBack = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    } else setImgIndex(images.length - 1);
  };

  const showImage = (indx) => {
    setShowIndex(false), setImgIndex(indx);
  };

  // 👇 Scroll on direct project link
  useEffect(() => {
    if (!router.isReady) return;
    const hasProjectQuery = !!router.query.project;
    if (!hasProjectQuery) return;

    const timeout = setTimeout(() => {
      aboutSection.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const imageArray = images.map((image, i) => (
    <span key={i} style={i == imgIndex ? { opacity: "1" } : { opacity: "0" }}>
      <div
        className={styles.sliderLeftbutton}
        onClick={() => loopImagesBack()}
        onMouseEnter={() => setMouseLable(true)}
        onMouseLeave={() => setMouseLable(false)}
      ></div>
      <div
        className={styles.sliderRightbutton}
        onClick={() => loopImages()}
        onMouseEnter={() => setMouseLable(true)}
        onMouseLeave={() => setMouseLable(false)}
      ></div>
      <Image
        alt={title}
        key={i}
        src={image.url}
        layout="fill"
        objectFit="contain"
        objectPosition="left top"
        // priority={i < 2 ? true : false}
        height={image.dimensions.height}
        width={image.dimensions.width}
        placeholder="blur"
        blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
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
        onClick={() => {
          if (!active) {
            setActiveIndex(index);
            router.push(`?project=${slug}`, undefined, { shallow: true });
          }
        }}
        ref={aboutSection}
        // style={index == 0 && activeIndex !== null ? { border: 0 } : {}}
      >
        {activeIndex === null && (
          <div className={styles.projectOverlay}>
            <Image
              src={previewImage.url}
              layout="fill"
              objectFit="contain"
              loading="eager"
            />
          </div>
        )}

        <div className={styles.projectColumnLeft}>
          <div className={styles.projectHeader}>
            <h1
              style={
                active
                  ? {
                      background: "var(--primary-color)",
                      color: "var(--bg-color)",
                    }
                  : {}
              }
              onClick={
                active
                  ? async () => {
                      await router.replace(router.pathname, undefined, {
                        shallow: true,
                      });
                      setActiveIndex(null);
                    }
                  : () => {}
              }
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

        {active && !showIndex && (
          <div className={styles.sliderOuter}>
            <div className={styles.slider}>
              {imageArray.map((image) => image)}
            </div>
          </div>
        )}

        {active && showIndex && (
          <div className={styles.archiveOuter}>
            <div className={styles.archiveWrapper}>
              {images.map((image, i) => (
                <div className={styles.archiveColumn} key={i}>
                  <Image
                    src={image.url}
                    layout="responsive"
                    objectFit="contain"
                    onClick={() => showImage(i)}
                    // priority={i < 4 ? "true" : "false"}
                    height={image.dimensions.height / 10}
                    width={image.dimensions.width / 10}
                    quality={1}
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.projectColumnRight}>
          <div className={styles.projectHeaderRight}>
            <h1 className={styles.projectCol2}>{client}</h1>
            <h1 className={styles.projectCol2}>
              {categories?.map((category, i) => (
                <span key={i}>
                  {category}
                  {i + 2 <= categories.length ? ", " : ""}
                </span>
              ))}
            </h1>
            <h1 className={styles.projectCol1}>{year}</h1>
            <h2 className={`${styles.downloadButton} ${styles.projectCol1}`}>
              <a href={presskit}>Download</a>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;

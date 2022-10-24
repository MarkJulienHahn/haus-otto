import React, { useState, useEffect, useRef, useCallback } from "react";

import { useSwiper } from "swiper/react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/project.module.css";

// import image01 from "../public/images/StairShelf_HausOtto_1.jpg";
// import image02 from "../public/images/StairShelf_HausOtto_2.jpg";
// import image03 from "../public/images/StairShelf_HausOtto_3.jpg";
// import image04 from "../public/images/StairShelf_HausOtto_4.jpg";
// import image05 from "../public/images/StairShelf_HausOtto_5.jpg";
// import image06 from "../public/images/StairShelf_HausOtto_6.jpg";

// const images = [image01, image02, image03, image04, image05, image06];

const SwiperInner = ({
  active,
  activeIndex,
  swiperINDX,
  setCurrentSlide,
  images,
}) => {
  const swiper = useSwiper();
  const swiperRef = useRef(null);

  const updateIndex = useCallback(
    () => setCurrentSlide(swiperRef.current.swiper.realIndex),
    []
  );

  const updateSlide = useCallback(
    (x) => setCurrentSlide(swiperRef.current.swiper.slideTo(x)),
    []
  );

  // const images = [image01, image02, image03, image04, image05, image06];

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);

  useEffect(() => {
    updateSlide(swiperINDX);
  }, []);

  console.log(images);

  return (
    <div
      className={styles.MBSlider}
      style={
        active ? { height: "100vw", marginTop: "10px" } : { height: "0px" }
      }
    >
      <Swiper className="swiper swiper-17-1" ref={swiperRef} loop={true}>
        {images.map((image, i) => (
          <SwiperSlide>
            <Image
              src={image.url}
              layout="responsive"
              objectFit="contain"
              height="100"
              width="100"
              objectPosition="left top"
              loading="eager"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperInner;

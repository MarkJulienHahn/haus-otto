import { useEffect, useRef, useCallback } from "react";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/project.module.css";

const SwiperInner = ({
  active,
  swiperINDX,
  setCurrentSlide,
  images,
}) => {
  const swiperRef = useRef(null);

  const updateIndex = useCallback(
    () => setCurrentSlide(swiperRef.current.swiper.realIndex),
    []
  );

  const updateSlide = useCallback(
    (x) => setCurrentSlide(swiperRef.current.swiper.slideTo(x)),
    []
  );

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


  return (
    <div
      className={styles.MBSlider}
      style={
        active ? { height: "100vw", marginTop: "10px" } : { height: "0px" }
      }
    >
      <Swiper className="swiper swiper-17-1" ref={swiperRef} loop={true}>
        {images.map((image, i) => (
          <SwiperSlide key={i} style={{padding: "8px"}}>
            <Image
              src={image.url}
              layout="responsive"
              objectFit="contain"
              height="100"
              width="100"
              objectPosition="left top"
              loading="eager"
              priority={i<5 ? "true" : "false"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperInner;

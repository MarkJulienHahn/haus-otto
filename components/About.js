import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import SelectedPress from "./SelectedPress";
import Footer from "./Footer";

import { PortableText } from "@portabletext/react";

import styles from "../styles/about.module.css";

const About = ({ data }) => {
  const [hoverImg, setHoverImg] = useState(null);
  const [hoverImgWidth, setHoverImgWidth] = useState("");
  const [hoverImgHeight, setHoverImgHeight] = useState("");

  const router = useRouter();

  const selected = data.selectedPress?.map((entry, i) => ({
    lable: entry.title,
    link: entry.link,
    image: entry.image?.url,
    width: entry.image?.dimensions.width,
    height: entry.image?.dimensions.height,
  }));

  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${styles.col4} ${styles.textColumn}`}>
          <div className={styles.textBlock}>
            <PortableText value={data.about} />
          </div>
        </div>

        <div className={`${styles.col5} ${styles.serviceColumn}`}>
          <div className={styles.menuItem}>Services</div>
          <div className={styles.textBlock}>
            <PortableText value={data.services} />
          </div>
          <div className={styles.menuItem}>Slected Clients</div>
          <div className={styles.textBlock}>
            <PortableText value={data.clients} />
          </div>
        </div>
        <div
          className={`${styles.col3} ${styles.smallText} ${styles.exhibitionsColumn}`}
        >
          <div className={`${styles.menuItem} ${styles.menuItemRow}`}>
            <h2>Upcoming Exhibitions</h2>
            <h2>Year</h2>
          </div>

          {data.upcomingShows && (
            <div className={styles.list}>
              <div>
                {data.upcomingShows?.map((show, i) => (
                  <div className={styles.aboutEntry} key={i}>
                    <h2>{show.title}</h2>
                    <h2>{show.year}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.pastShows && (
            <div className={styles.list}>
              <div className={styles.menuItem}>
                <h2>Past Exhibitions</h2>
              </div>
              <div>
                {data.pastShows?.map((show, i) => (
                  <div className={styles.aboutEntry} key={i}>
                    <h2>{show.title}</h2>
                    <h2>{show.year}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.awards && (
            <div className={styles.list}>
              <div className={styles.menuItem}>
                <h2>Awards</h2>
              </div>
              <div>
                {data.awards?.map((show, i) => (
                  <div className={styles.aboutEntry} key={i}>
                    <h2>{show.title}</h2>
                    <h2>{show.year}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={`${styles.col3} ${styles.smallText} ${styles.workshopsMobile}`}
          >
            {data.workshops && (
              <div className={styles.list}>
                <div className={styles.menuItem}>
                  <h2>Workshops, Lectures, Events</h2>
                </div>
                <div>
                  {data.workshops?.map((show, i) => (
                    <div className={styles.aboutEntry} key={i}>
                      <h2>{show.title}</h2>
                      <h2>{show.year}</h2>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.col2}>
          <div className={styles.menuItem}>Office</div>
          <div className={styles.textBlock}>
            <PortableText value={data.contact} />
          </div>
          <div className={styles.menuItem}>Warehouse</div>
          <div className={styles.textBlock}>
            <PortableText value={data.contact2} />
          </div>
        </div>

        <div className={styles.col2}>
          <div className={styles.menuItem}>Contact</div>
          <div className={styles.textBlock}>
            <a href={`mailto:${data.mail}`}>{data.mail}</a>
            <br />
            {data.phone}
            <br />
            <a href={data.instagram}>@haus.otto</a>
          </div>
        </div>

        <div className={`${styles.col5} ${styles.selectedPress}`}>
          <h2 className={styles.menuItem}>Selected Press</h2>
          <h2>
            {selected?.map((press, i) => (
              <span key={i}>
                <SelectedPress
                  lable={press.lable}
                  link={press.link}
                  img={press.image}
                  width={press.width}
                  height={press.height}
                  setHoverImg={setHoverImg}
                  setHoverImgWidth={setHoverImgWidth}
                  setHoverImgHeight={setHoverImgHeight}
                />
                {i < selected.length - 1 && " – "}
              </span>
            ))}
          </h2>
          <div className={styles.headerImg}>
            {hoverImg && (
              <Image
                src={hoverImg}
                width={hoverImgWidth}
                height={hoverImgHeight}
                priority
              />
            )}
          </div>
        </div>

        <div
          className={`${styles.col3} ${styles.smallText} ${styles.workshopsDesktop}`}
        >
          {data.workshops && (
            <div className={styles.list}>
              <div className={styles.menuItem}>
                <h2>Workshops, Lectures, Events</h2>
              </div>
              <div>
                {data.workshops?.map((show, i) => (
                  <div className={styles.aboutEntry} key={i}>
                    <h2>{show.title}</h2>
                    <h2>{show.year}</h2>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </>
  );
};

export default About;

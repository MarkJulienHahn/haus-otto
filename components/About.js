import { useState } from "react";

import Image from "next/image";

import SelectedPress from "./SelectedPress";

import { PortableText } from "@portabletext/react";

import styles from "../styles/about.module.css";
import styles2 from "../styles/Header.module.css";
import Link from "next/link";

const About = ({ data }) => {
  const [hoverImg, setHoverImg] = useState(null);
  const [hoverImgWidth, setHoverImgWidth] = useState("");
  const [hoverImgHeight, setHoverImgHeight] = useState("");
  const [imprintActive, setImprintActive] = useState(false);

  const selected = data.selectedPress.map((entry, i) => ({
    lable: entry.title,
    image: entry.image.url,
    width: entry.image.dimensions.width,
    height: entry.image.dimensions.height,
  }));

  return (
    <>
      <div className={styles2.headerAboutWrapper}>
        <div className={styles2.headerAboutTopWrapper}>
          <Link href={"/"}>
            <a>Haus Otto</a>
          </Link>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
        </div>
        <div className={styles2.headerAboutBottomWrapper}>
          <h2 className={styles2.headerAboutHeader}>About</h2>

          <div className={styles2.headerSelectedPress}>
            <h2>Selected Press</h2>
            <h2>
              {selected.map((press, i) => (
                <span key={i}>
                  <SelectedPress
                    lable={press.lable}
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
            <div className={styles2.headerImg}>
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

          <div className={styles2.headerAboutCol}>
            <div className={styles2.headerAboutTop}>
              <h2>Upcoming Shows</h2>
              <h2>Year</h2>
            </div>
            <div className={styles.aboutUpcomingShows}>
              {data.upcomingShows.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <h2>{show.title}</h2>
                  <h2>{show.year}</h2>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <h2>Past Shows</h2>
              <h2>Year</h2>
            </div>
            <div className={styles.aboutUpcomingShows}>
              {data.pastShows.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <h2>{show.title}</h2>
                  <h2>{show.year}</h2>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <h2>Awards</h2>
              <h2>Year</h2>
            </div>
            <div className={styles.aboutPastShows}>
              {data.awards.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <h2>{show.title}</h2>
                  <h2>{show.year}</h2>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <h2>Part Of</h2>
              <h2>Year</h2>
            </div>
            <div className={styles.aboutPastShows}>
              {data.partOf.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <h2>{show.title}</h2>
                  <h2>{show.year}</h2>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <h2>Workshops, Lectures and Events</h2>
              <h2>Year</h2>
            </div>
            <div className={styles.aboutPastShows}>
              {data.workshops.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <h2>{show.title}</h2>
                  <h2>{show.year}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutText}>
          <PortableText value={data.about} />
        </div>
      </div>
      <div className={styles.MBaboutWrapper}>
        <div className={styles.MBaboutText}>
          <PortableText value={data.about} />
          <h2>Contact</h2>
          <div className={styles.MBaboutContact}>
            <PortableText value={data.contact} />
          </div>
        </div>  
          <div className={styles.MBaboutPress}>
            <div className={styles2.headerAboutTop}>
              <p>Upcoming Shows</p>
            </div>
            <div className={styles.aboutUpcomingShows}>
              {data.upcomingShows.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <p>{show.title}</p>
                  <p>{show.year}</p>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <p>Past Shows</p>
            </div>
            <div className={styles.aboutUpcomingShows}>
              {data.pastShows.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <p>{show.title}</p>
                  <p>{show.year}</p>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <p>Awards</p>
            </div>
            <div className={styles.aboutPastShows}>
              {data.awards.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <p>{show.title}</p>
                  <p>{show.year}</p>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <p>Part Of</p>
            </div>
            <div className={styles.aboutPastShows}>
              {data.partOf.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <p>{show.title}</p>
                  <p>{show.year}</p>
                </div>
              ))}
            </div>

            <div className={styles2.headerAboutMid}>
              <p>Workshops, Lectures and Events</p>
            </div>
            <div className={styles.aboutPastShows}>
              {data.workshops.map((show, i) => (
                <div className={styles.aboutEntry} key={i}>
                  <p>{show.title}</p>
                  <p>{show.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.MBimprint}>
            <h3 onClick={() => setImprintActive(!imprintActive)}>Imprint</h3>

            {imprintActive && (
              <div className={styles.imprintWrapper}>
                <div className={styles.imprintTop}>
                  <PortableText value={data.kontaktNils} />
                </div>
                <div className={styles.imprintTop}>
                  <PortableText value={data.kontaktPatrick} />
                </div>
                <div className={styles.imprintTop}>
                  <p>©{new Date().getFullYear()}</p>
                </div>
                <PortableText value={data.imprint} />
              </div>
            )}
          </div>

        <div className={styles.footerWrapper}>©Haus Otto GmbH 2022</div>
      </div>
    </>
  );
};

export default About;

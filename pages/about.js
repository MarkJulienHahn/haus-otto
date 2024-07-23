import React, { useState, useEffect } from "react";
import HeaderAbout from "../components/HeaderAbout";
import FooterAbout from "../components/FooterAbout";
import Head from "next/head";
import client from "../client";
import About from "../components/About";
import styles from "../styles/about.module.css";

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(`
          *[_type == "about"] {
            ..., 
            "selectedPress": selectedPress[] {
              title, 
              link, 
              "image": hoverImage.asset->{url, "dimensions": metadata.dimensions}
            }, 
            "portrait": portrait.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash}
          }
        `);
        setData(data[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Haus Otto | About</title>
        <meta
          name="description"
          content="Haus Otto wurde von Patrick Henry Nagel und Nils Körner gegründet, nachdem sie gemeinsam Industriedesign an der Staatlichen Akademie der Bildenden Künste in Stuttgart studiert hatten."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderAbout data={data} />
        <About data={data} />
        <FooterAbout data={data} />
      </main>
    </>
  );
};

export default AboutPage;

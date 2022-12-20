import React from "react";
import HeaderAbout from "../components/HeaderAbout";
import FooterAbout from "../components/FooterAbout";

import Head from "next/head";
import client from "../client";

import About from "../components/About";

import styles from "../styles/about.module.css";

const imprint = ({ data }) => {
  return (
    <>
      <Head>
        <title>Haus Otto | Imprint</title>
        <meta name="description" content="Haus Otto wurde von Patrick Henry Nagel und Nils Körner gegründet, nachdem sie gemeinsam Industriedesign an der Staatlichen Akademie der Bildenden Künste in Stuttgart studiert hatten." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderAbout data={data[0]} />
        <About data={data[0]} />
        <FooterAbout data={data[0]} imprintState={true}/>
      </main>
    </>
  );
};

export default imprint;

export async function getServerSideProps() {
  const data = await client.fetch(`
  *    [_type == "about"]{..., "selectedPress": selectedPress[]{title, link, "image": hoverImage.asset->{url, "dimensions": metadata.dimensions}}, "portrait": portrait.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash}}`);
  return {
    props: {
      data,
    },
  };
}

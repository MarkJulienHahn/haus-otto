import { useState, useEffect, useRef } from "react";

import Head from "next/head";

import client from "../client";

import styles from "../styles/Home.module.css";

import Projects from "../components/Projects";
import Cookies from "../components/Cookies"

export default function Home({ projects, data }) {
  return (
    <div>
      <Head>
        <title>Haus Otto</title>
        <meta
          name="description"
          content="Haus Otto wurde von Patrick Henry Nagel und Nils Körner gegründet, nachdem sie gemeinsam Industriedesign an der Staatlichen Akademie der Bildenden Künste in Stuttgart studiert hatten."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Projects projects={projects} data={data[0]} />
        <Cookies />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const projects = await client.fetch(`
  *   [_type == "project"] |order(orderRank) {..., "title": title, "description": description, "images": images[].asset->{url, "dimensions": metadata.dimensions}, photography, year, client, "presskit": presskit.asset->{url}, "previewImage": previewImage.asset->{url, "dimensions": metadata.dimensions}
}`);
  const data = await client.fetch(`
*      [_type == "about"]{"portrait": portrait.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash}}`);
  return {
    props: {
      projects,
      data,
    },
  };
}

import { useState, useEffect, useRef } from "react";

import Head from "next/head";

import client from "../client";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import Projects from "../components/Projects";
import Cookies from "../components/Cookies";
import Landing from "../components/Landing";
import Header from "../components/Header"

export default function Home({ landing, projects, data, setTheme }) {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(false);

  const isClient = typeof window !== "undefined";

  const initialRender = useRef(true);

  // useEffect(() => {
  //   if (!isClient) return;

  //   const landingShown = sessionStorage.getItem("landingShown");
  //   const isLandingQuery = router.query.landing === "true";
  //   const isProjectQuery = !!router.query.project;
  //   const isHomePage = router.pathname === "/";
  //   const isInitialVisit =
  //     initialRender.current &&
  //     isHomePage &&
  //     Object.keys(router.query).length === 0;

  //   if (!isHomePage || isProjectQuery) {
  //     setShowLanding(false);
  //     return;
  //   }

  //   if (
  //     (isLandingQuery || isInitialVisit || !landingShown) &&
  //     !isProjectQuery
  //   ) {
  //     setShowLanding(true);
  //     sessionStorage.setItem("landingShown", "true");

  //     // Add ?landing=true if not already present
  //     // if (!isLandingQuery) {
  //     //   router.replace("?landing=true", undefined, { shallow: true });
  //     // }
  //   } else {
  //     setShowLanding(false);
  //   }

  //   initialRender.current = false;
  // }, [router.query, router.pathname]);

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
        <Header data={data} setTheme={setTheme} />
        <Landing landing={landing} />
        <Projects setTheme={setTheme} projects={projects} data={data[0]} />

        <Cookies />
        {/* <div className={styles.backdrop} /> */}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const landing = await client.fetch(
    `* [_type == "landing"] {..., "imageUrl": headlineImage.asset->{url}}[0]`
  );
  const projects = await client.fetch(`
  *   [_type == "project"] |order(orderRank) {..., "title": title, "description": description, "images": images[].asset->{url, "dimensions": metadata.dimensions}, photography, year, client, "presskit": presskit.asset->{url}, "previewImage": previewImage.asset->{url, "dimensions": metadata.dimensions}
}`);
  const data = await client.fetch(`
*      [_type == "about"]{"portrait": portrait.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash}}`);
  return {
    props: {
      landing,
      projects,
      data,
    },
  };
}

import { useState } from "react";

import client from "../client";
import styles from "../styles/Home.module.css";

import Projects from "../components/Projects";
import Cookies from "../components/Cookies";
import Landing from "../components/Landing";
import Header from "../components/Header";

export default function Home({ landing, projects, data, setTheme }) {
  const [isLanding, setIsLanding] = useState(true);
  console.log(isLanding)
  return (
    <>
      <Landing landing={landing} setIsLanding={setIsLanding} />
      <Projects
        setTheme={setTheme}
        projects={projects}
        data={data[0]}
        isLanding={isLanding}
        setIsLanding={setIsLanding}
      />
      <Cookies />
      <div className={styles.backdrop} />
    </>
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

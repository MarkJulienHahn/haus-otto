import client from "../client";
import About from "../components/About";
import styles from "../styles/Home.module.css";

const about = ({ data }) => {
  return (
    <>
      <About data={data[0]} />
      <div className={styles.backdrop} />
    </>
  );
};

export default about;

export async function getServerSideProps() {
  const data = await client.fetch(`
  *    [_type == "about"]{..., "selectedPress": selectedPress[]{title, link, "image": hoverImage.asset->{url, "dimensions": metadata.dimensions}}, "portrait": portrait.asset->{url, "dimensions": metadata.dimensions, "blurHash": metadata.blurHash}}`);
  return {
    props: {
      data,
    },
  };
}

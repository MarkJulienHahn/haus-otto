import Head from "next/head";
import Header from "../components/Header";

export default function Layout({ data, children, theme, setTheme }) {
  return (
    <>
      <Head>
        <title>Haus Otto</title>
        <meta
          name="description"
          content="Haus Otto wurde von Patrick Henry Nagel und Nils Körner gegründet, nachdem sie gemeinsam Industriedesign an der Staatlichen Akademie der Bildenden Künste in Stuttgart studiert hatten."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header data={data} setTheme={setTheme} theme={theme} />
        {children}
      </main>
    </>
  );
}

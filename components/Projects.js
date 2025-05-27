import { useState, useRef, useEffect } from "react";

import styles from "../styles/project.module.css";

import useWindowDimensions from "./hooks/useWindowDimensions";
import { useRouter } from "next/router";

import Project from "./Project";
import ProjectMobile from "./ProjectMobile";
import Footer from "./Footer";
import Header from "./Header";

const Projects = ({ setTheme, projects, data }) => {
  const { height } = useWindowDimensions();

  const [sortKey, setSortKey] = useState("year");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedProjects, setSortedProjects] = useState([...projects]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [refHeight, setRefHeight] = useState();
  const [refMobileHeight, setRefMobileHeight] = useState();

  const projectsRef = useRef();
  const projectsMobileRef = useRef();

  const router = useRouter();

  useEffect(() => {
    setRefHeight(projectsRef.current?.clientHeight);
    setRefMobileHeight(projectsMobileRef.current?.clientHeight);
  }, []);



  useEffect(() => {
    const sorted = [...projects].sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      const compare = valA.localeCompare(valB);
      return sortOrder === "asc" ? compare : -compare;
    });
    setSortedProjects(sorted);
  }, [sortKey, sortOrder, projects]);



  useEffect(() => {
    if (!router.isReady) return;

    const slugFromUrl = router.query.project;
    if (!slugFromUrl || activeIndex !== null) return;

    const index = sortedProjects.findIndex(
      (project) => project.slug?.current === slugFromUrl
    );

    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [router.isReady, router.query.project, sortedProjects, activeIndex]);

  return (
    <>
      <Header
        data={data}
        setTheme={setTheme}
      />

      <div
        className={styles.projectsWrapper}
        ref={projectsRef}
        style={
          activeIndex == null
            ? {
                position: "absolute",
                top: `calc(100vh - ${refHeight + 120}px)`,
              }
            : { position: "absolute", top: `0px` }
        }
      >
        <div
          className={styles.projectsInner}
          style={
            !activeIndex
              ? { paddingTop: refHeight - height + 80 }
              : { paddingTop: 0 }
          }
        >
          <div className={styles.projectHeadlines}>
            <div className={styles.projectHeadlinesInner}>
              <h1
                className={styles.projectCol2}
                onClick={() =>
                  setSortKey((prev) => {
                    if (prev === "client") {
                      setSortOrder((order) =>
                        order === "asc" ? "desc" : "asc"
                      );
                      return prev;
                    }
                    setSortOrder("asc");
                    return "client";
                  })
                }
              >
                Client/Collaborator{" "}
                {sortKey === "client" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </h1>
              <h1
                className={styles.projectCol2}
                onClick={() =>
                  setSortKey((prev) => {
                    if (prev === "case") {
                      setSortOrder((order) =>
                        order === "asc" ? "desc" : "asc"
                      );
                      return prev;
                    }
                    setSortOrder("asc");
                    return "case";
                  })
                }
              >
                Case{" "}
                {sortKey === "case" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </h1>
              <h1
                className={styles.projectCol1}
                onClick={() =>
                  setSortKey((prev) => {
                    if (prev === "year") {
                      setSortOrder((order) =>
                        order === "asc" ? "desc" : "asc"
                      );
                      return prev;
                    }
                    setSortOrder("asc");
                    return "year";
                  })
                }
              >
                Year{" "}
                {sortKey === "year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </h1>
              <h1 className={`${styles.projectCol1} ${styles.alignRight}`}>
                Presskit
              </h1>
            </div>
          </div>
          {sortedProjects.map((project, i) => (
            <Project
              key={i}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              title={project.title}
              slug={project.slug?.current}
              category={project.case}
              client={project.client}
              photography={project.photography}
              presskit={project.presskit?.url}
              description={project.description}
              year={project.year}
              index={i}
              images={project.images}
              previewImage={project.previewImage}
            />
          ))}
        </div>
        <Footer />
      </div>

      <div
        className={styles.projectsMobileWrapper}
        ref={projectsMobileRef}
        style={
          activeIndex == null
            ? {
                position: "relative",
                paddingTop: "50px",
              }
            : { position: "absolute", top: `60px` }
        }
      >
        {projects.map((project, i) => (
          <ProjectMobile
            key={i}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            title={project.title}
            slug={project.slug?.current}
            category={project.case}
            client={project.client}
            photography={project.photography}
            presskit={project.presskit?.url}
            description={project.description}
            year={project.year}
            index={i}
            images={project.images}
            previewImage={project.previewImage}
          />
        ))}
        <Footer />
      </div>
    </>
  );
};

export default Projects;

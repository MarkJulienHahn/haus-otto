import { useState, useRef, useEffect } from "react";
import styles from "../styles/project.module.css";

import useWindowDimensions from "./hooks/useWindowDimensions";
import { useRouter } from "next/router";

import Project from "./Project";
import ProjectMobile from "./ProjectMobile";
import Footer from "./Footer";

const Projects = ({ projects }) => {
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

  // 👇 Intersection Observer for desktop
  useEffect(() => {
    const section = projectsRef.current;
   
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          // setActiveIndex(null);
          const { project, ...restQuery } = router.query;
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, [projectsRef.current]);

  // 👇 Intersection Observer for mobile
  useEffect(() => {
    const section = projectsMobileRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          // setActiveIndex(null);
          const { project, ...restQuery } = router.query;
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  return (
    <>
      <div className={styles.projectsWrapper} ref={projectsRef}>
        <div
          className={styles.projectsInner}
          // style={
          //   !activeIndex
          //     ? { paddingTop: refHeight - height + 80 }
          //     : { paddingTop: 0 }
          // }
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
              categories={project.categories}
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

      <div className={styles.projectsMobileWrapper} ref={projectsMobileRef}>
        {projects.map((project, i) => (
          <ProjectMobile
            key={i}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            title={project.title}
            slug={project.slug?.current}
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

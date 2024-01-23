import { useState, useRef, useEffect } from "react";

import styles from "../styles/project.module.css";

import useWindowDimensions from "./hooks/useWindowDimensions";

import Project from "./Project";
import ProjectMobile from "./ProjectMobile";
import Footer from "./Footer";
import Header from "./Header";

const Projects = ({ projects, data }) => {
  const { width, height } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(null);
  const [refHeight, setRefHeight] = useState();
  const [refMobileHeight, setRefMobileHeight] = useState();

  const projectsRef = useRef();
  const projectsMobileRef = useRef();

  useEffect(() => {
    setRefHeight(projectsRef.current?.clientHeight);
    setRefMobileHeight(projectsMobileRef.current?.clientHeight);
  }, []);

  return (
    <>
      <Header
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        data={data}
      />

      <div
        className={styles.projectsWrapper}
        ref={projectsRef}
        style={
          activeIndex == null
            ? {
                position: "absolute",
                top: `calc(100vh - ${refHeight + 39}px)`,
              }
            : { position: "absolute", top: `0px` }
        }
      >
        <div
          className={styles.projectsInner}
          style={
            !activeIndex
              ? { paddingTop: refHeight - height + 40 }
              : { paddingTop: 0 }
          }
        >
          {projects.map((project, i) => (
            <Project
              key={i}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              title={project.title}
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
                position: "absolute",
                top: `calc(100vh - ${refMobileHeight}px)`,
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

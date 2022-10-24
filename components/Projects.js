import { useState } from "react";

import styles from "../styles/project.module.css";

import Project from "./Project";
import ProjectMobile from "./ProjectMobile";

const Projects = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <>
      <div className={styles.projectsWrapper}>
        {projects.map((project, i) => (
          <Project
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

      <div className={styles.projectsMobileWrapper}>

        {projects.map((project, i) => (
          <ProjectMobile
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
    </>
  );
};

export default Projects;

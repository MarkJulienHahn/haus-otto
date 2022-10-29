import React, { useState, useRef, useEffect } from "react";

import styles from "../styles/project.module.css";
import { PortableText } from "@portabletext/react";

const ProjectActive = ({
  active,
  description,
  photography,
  client,
  presskit,
}) => {
  const [height, setHeight] = useState("00px");
  const ref01 = useRef(null);

  useEffect(() => {
    active && setHeight(ref01.current?.clientHeight),
      !active && setHeight("0px");
  });

  return (
    <>
      <div
        className={styles.projectActiveWrapper}
        style={
          !active
            ? { height: height, overflow: "hidden" }
            : { height: height, overflow: "hidden" }
        }
      >
        <div className={styles.projectInfo} ref={ref01}>
          <PortableText value={description} />
          <p>{client && <>Client: {client}</>}</p>
          <p>{photography && <>Photography: {photography}</>}</p>

          {presskit && (
            <>
              <h2 className={styles.subHeadline}>Presskit</h2>
              <div className={styles.downloadButton}>
                <h2>
                  <a href={presskit}>Download</a>
                </h2>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectActive;

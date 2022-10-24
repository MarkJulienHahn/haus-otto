import { useState, useEffect } from "react";

const MouseElement = ( {imgIndex, length}) => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  const mouseElement = {
    position: "fixed",
    top: y,
    left: x,
    zIndex: "500",
    cursor: "none",
    pointerEvents: "none"
  };

  return <div style={mouseElement}>{`${imgIndex} / ${length}`}</div>;
};

export default MouseElement;

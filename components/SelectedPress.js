import React from "react";

const SelectedPress = ({
  lable,
  link,
  img,
  width,
  height,
  setHoverImg,
  setHoverImgWidth,
  setHoverImgHeight,
}) => {
  return (
    <span
      onMouseEnter={() => {
        setHoverImg(img), setHoverImgWidth(width), setHoverImgHeight(height);
      }}
      onMouseLeave={() => setHoverImg(null)}
    >
      <a href={link} target="_blank">
        {lable}
      </a>
    </span>
  );
};

export default SelectedPress;

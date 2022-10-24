import React from "react";

const SelectedPress = ({
  lable,
  img,
  width,
  height,
  setHoverImg,
  setHoverImgWidth,
  setHoverImgHeight,
}) => {
  console.log(width, height);
  return (
    <span
      onMouseEnter={() => {
        setHoverImg(img), setHoverImgWidth(width), setHoverImgHeight(height);
      }}
      onMouseLeave={() => setHoverImg(null)}
    >
      {lable}
    </span>
  );
};

export default SelectedPress;

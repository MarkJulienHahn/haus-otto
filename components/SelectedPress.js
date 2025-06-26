import styles from "../styles/about.module.css";

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
      className={styles.selectedPressEntry}
      onMouseEnter={() => {
        setHoverImg(img), setHoverImgWidth(width), setHoverImgHeight(height);
      }}
      onMouseLeave={() => setHoverImg(null)}
    >
      <a href={link} target="_blank" rel="noreferrer">
        {lable}
      </a>
    </span>
  );
};

export default SelectedPress;

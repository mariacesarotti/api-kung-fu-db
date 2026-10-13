import React from "react";
import styles from "./PosturaImage.module.scss";

interface PosturaImageProps {
  imagem: string;
  gif: string | undefined;
  autoplay?: boolean;
}

const PosturaImage = ({ imagem, gif, autoplay = false }: PosturaImageProps) => {
  const showGif = autoplay && !!gif;
  // shown while the real file of this postura has not been added to public/assets yet
  const placeholder = `${process.env.PUBLIC_URL}/assets/${
    showGif ? "gifs" : "images"
  }/placeholder.webp`;

  return (
    <img
      src={process.env.PUBLIC_URL + (showGif ? gif : imagem)}
      alt="Postura"
      loading="lazy"
      onError={(e) => {
        if (!e.currentTarget.src.endsWith(placeholder)) {
          e.currentTarget.src = placeholder;
        }
      }}
      className={`${styles.posturaImg} ${autoplay ? styles.gif : ""}`}
    />
  );
};

export default PosturaImage;

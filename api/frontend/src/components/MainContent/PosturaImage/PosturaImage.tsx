import React from "react";
import classNames from "classnames";
import styles from "./PosturaImage.module.scss";

interface PosturaImageProps {
  imagem: string;
  gif: string | undefined;
  autoplay?: boolean;
}

const PosturaImage = ({ imagem, gif, autoplay = false }: PosturaImageProps) => {
  return (
    <img
      src={autoplay ? process.env.PUBLIC_URL + gif : process.env.PUBLIC_URL + imagem}
      alt="Postura"
      className={classNames(styles.posturaImg, { [styles.gif]: autoplay })}
    />
  );
};

export default PosturaImage;

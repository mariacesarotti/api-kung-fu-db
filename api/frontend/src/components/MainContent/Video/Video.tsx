import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Video.module.scss";

const Video = () => {
  const { faixa } = useParams();

  return (
    <div className={styles.videoContainer}>
      <h2>Kati completo – Faixa {faixa}</h2>
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // substitua pelas URLs certas por faixa
          title={`Kati ${faixa}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;

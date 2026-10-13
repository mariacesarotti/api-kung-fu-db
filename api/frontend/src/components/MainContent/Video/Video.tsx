import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Video.module.scss";

// id do vídeo no YouTube (o trecho depois de "watch?v=") do kati completo de cada faixa
const VIDEOS: Record<string, string> = {
  amarela: "",
  laranja: "",
  jade: "",
};

const Video = () => {
  const { faixa = "" } = useParams();
  const videoId = VIDEOS[faixa];

  return (
    <div className={styles.videoContainer}>
      <h2>Kati completo – Faixa {faixa}</h2>
      {videoId ? (
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Kati ${faixa}`}
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>vídeo em breve</p>
      )}
    </div>
  );
};

export default Video;

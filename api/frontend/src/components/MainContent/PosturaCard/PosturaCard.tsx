import { PosturaModel } from "../../../types/posturaTypes";
import PosturaImage from "../PosturaImage/PosturaImage";
import styles from "./PosturaCard.module.scss"; // Import SCSS module

interface PosturaCardProps {
  postura: PosturaModel;
  reverseLayout?: boolean;
}

const PosturaCard = ({ postura, reverseLayout = false }: PosturaCardProps) => {
  return (
    <div
      className={`${styles.posturaCard} ${
        reverseLayout ? styles.reverse : ""
      }`}
    >
      <PosturaImage imagem={postura.imagem} gif={postura.gif || ""} />
      <div>
        <h2 className={styles.orange}>{postura.nome} | {postura.kati}</h2>
        <p>{postura.descricao}</p>
      </div>
    </div>
  );
};

export default PosturaCard;

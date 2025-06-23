import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <h1>katis completos</h1>
      <ul>
        <li>
          <button onClick={() => navigate("/video/amarela")}>amarela</button>
        </li>
        <li>
          <button onClick={() => navigate("/video/laranja")}>laranja</button>
        </li>
        <li>
          <button onClick={() => navigate("/video/jade")}>jade</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

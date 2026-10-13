import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Header.module.scss";
import Nav from "../Nav/Nav";
import kinlayLogo from "../imgs/kinlay.webp";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <header className="header">
        <Link to="/"> {/* Wrap the div with Link */}
          <div>
            <img src={kinlayLogo} alt="kinlay symbol" />
            <h1>kung fu choy lay fut</h1>
          </div>
        </Link>
        <Nav />
      </header>
    </div>
  );
};

export default Header;

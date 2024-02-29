import styles from "./Logo.module.css";
import LogoImage from "../assets/images/logo.png"
import { Link } from "react-router-dom";

function Logo() {
  return <Link to="/"><img src={LogoImage} alt="WorldWise logo" className={styles.logo} /></Link>;
}

export default Logo;

import { useState } from "react";
import styles from "../../styles/ScrollToTopButton.module.css";

export default function ScrollToTopButton() {

  const [display, setDisplay] = useState(false);

  function toggleDisplay() {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 1000) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }

  function scrollToTopHandler() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", toggleDisplay);
  }

  return(
    <button className={styles.scrollToTopButtonWrapper} style={{display: display ? "flex" : "none" }} onClick={scrollToTopHandler}><i className="fas fa-arrow-up"></i></button>
  )
}
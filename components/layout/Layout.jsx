import Container from "react-bootstrap/Container";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particleOptions from "../../public/particleOptions.json";
import Navigation from "./Navigation";
import Heading from "./Heading";
import styles from "../../styles/Layout.module.css";
import ScrollToTopButton from "./ScrollToTopButton";
import BackButton from "./BackButton";


export default function Layout({ title, children, backButton }) {

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <div className="pageWrapper">
        <header>
          <Navigation></Navigation>
        </header>
        <main>
          {backButton ? <BackButton></BackButton> : ""}
          <Container className={styles.layoutContainer}>
            <Heading title={title}></Heading>
            {children}
          </Container>
          <ScrollToTopButton></ScrollToTopButton>
        </main>
        <footer className={styles.footer}>
          <p>@ Intouch 2022</p>
        </footer>
      </div>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particleOptions}></Particles>
    </>
  );
}
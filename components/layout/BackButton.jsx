import { useRouter } from "next/router"
import styles from "../../styles/BackButton.module.css";

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return(
    <div className={styles.backButtonHolder}>
      <i aria-hidden="false" aria-label="Back button" className="fas fa-arrow-left" onClick={goBack}></i>
    </div>
  )
}
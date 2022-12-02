import styles from "../../../../styles/PostBlockManagePostButton.module.css";
import { useRouter } from "next/router";

export default function PostBlockManagePostButton({ postId }) {

  const router = useRouter();

  function moveToEdit() {
    router.push(`/managepost/${postId}`);
  }

  return(
    <button className={`globalButtonStyling buttonPrimary ${styles.managePostButton}`} onClick={moveToEdit}>
      <i className="far fa-edit"></i>
      Manage Post
    </button>
  )
}
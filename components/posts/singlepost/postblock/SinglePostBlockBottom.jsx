import styles from "../../../../styles/PostBlockBottom.module.css";
// import PostBlockReactWithEmoji from "./PostBlockReactWithEmoji";
import { useRouter } from "next/router";

export default function SinglePostBlockBottom({ reactions, comments, toggleComments, postId }) {

  const router = useRouter();

  function commentToggler() {
    toggleComments(true);
    console.log(postId);
    router.push(`/home#comments${postId}`, undefined, { shallow: true });
    console.log("comments toggled!"); // delete console log
  }

  return(
    <div className={styles.postBlockBottom}>
      <div className={styles.postBlockBottomLeftside}>
        {/* <i className="far fa-smile"></i> */}
        {/* <PostBlockReactWithEmoji></PostBlockReactWithEmoji> */}
        {reactions ? reactions.map((reaction) => {
          return(
            <div key={reaction.symbol}>
              <p>{reaction.symbol}</p>
              <p>{reaction.count}</p>
            </div>
          )
        }) : ""}
      </div>
      <div className={styles.postBlockBottomRightside} onClick={commentToggler}>
        <i className="far fa-comment"></i>
        <p>{comments.length}</p>
        <p>Comment(s)</p>
      </div>
    </div>
  )
}
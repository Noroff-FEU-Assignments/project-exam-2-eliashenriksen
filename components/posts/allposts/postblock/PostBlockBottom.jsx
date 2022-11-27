import styles from "../../../../styles/PostBlockBottom.module.css";
import PostBlockReactWithEmoji from "./PostBlockReactWithEmoji";
import { useRouter } from "next/router";
import PostBlockBottomReactions from "./PostBlockBottomReactions";
import { useState } from "react";

export default function PostBlockBottom({ reactions, comments, toggleComments, postId }) {


  const [reactionUpdateTracker, setReactionUpdateTracker] = useState(0);
  const router = useRouter();
  // console.log("current route:", router.pathname); // delete console log

  //Since i am using this component in both the home page and the single post page, and the way that dynamic routes work in Next, i needed some custom code
  //to be able to use the correct route on the single post page (dynamic-route page), because router.pathname returns only the generic dynamic route name [pid].
  //The goal of all this is to re-locate the viewport to the comment section when the user clicks and toggles on comments. Without relocation, the user might not notice
  //that the comments have been turned on, which is bad UX.
  let currentRoute = router.pathname;
  if (currentRoute === "/post/[pid]") {
    currentRoute = `/post/${postId}`;
  }

  function commentToggler() {
    toggleComments(true);
    console.log(postId); // delete console log
    router.push(`${currentRoute}#comments${postId}`, undefined, { shallow: true });
    console.log("comments toggled!"); // delete console log
  }

  return(
    <div className={styles.postBlockBottom}>
      <div className={styles.postBlockBottomLeftside}>
        <PostBlockReactWithEmoji updateReactions={setReactionUpdateTracker} reactionUpdateTracker={reactionUpdateTracker} postId={postId}></PostBlockReactWithEmoji>
        <PostBlockBottomReactions reactionUpdateTracker={reactionUpdateTracker} reactionsOnLoad={reactions} postId={postId}></PostBlockBottomReactions>
      </div>
      <div className={styles.postBlockBottomRightside} onClick={commentToggler}>
        <i className="far fa-comment"></i>
        <p>{comments.length}</p>
        <p>Comment(s)</p>
      </div>
    </div>
  )
}
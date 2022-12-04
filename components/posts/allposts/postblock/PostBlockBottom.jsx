import styles from "../../../../styles/PostBlockBottom.module.css";
import PostBlockReactWithEmoji from "./PostBlockReactWithEmoji";
import { useRouter } from "next/router";
import PostBlockBottomReactions from "./PostBlockBottomReactions";
import { useState } from "react";

export default function PostBlockBottom({ reactions, comments, toggleComments, postId, profileId }) {


  const [reactionUpdateTracker, setReactionUpdateTracker] = useState(0);
  const router = useRouter();

  //I use this component in several places and therefore need some dynamic code to handle the different scenarios it appears in. This is due to how Next routing works,
  //and how i have decided to solve the UX of relocation to the comment section. I use custom ID tags for the specific comment sections and then push the router to
  //those specific ID's. Because router pathname returns a generic [pid] or [profileid] route when used on dynamic routing, i had to add code to handle this and push
  //through the correct route.
  //The goal of all this is to re-locate the viewport to the comment section when the user clicks and toggles on comments. Without relocation, the user might not notice
  //that the comments have been turned on, which is bad UX.
  //Towards the end of my project after having looked more into next router, it appears there was some nice functionality like router asPath, i could have used here.
  let currentRoute = router.pathname;
  if (currentRoute === "/post/[pid]") {
    currentRoute = `/post/${postId}`;
  } else if (currentRoute === "/profile/[profileid]") {
    currentRoute = `/profile/${profileId}`;
  }

  function commentToggler() {
    toggleComments(true);
    router.push(`${currentRoute}#comments${postId}`, undefined, { shallow: true });
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
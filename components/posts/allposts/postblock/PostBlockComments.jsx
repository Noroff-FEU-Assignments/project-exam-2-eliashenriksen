import { Container } from "react-bootstrap"
import moment from "moment/moment";
import React, { useEffect, useState} from "react";
import useAxios from "../../../../hooks/useAxios";
import styles from "../../../../styles/PostBlockComments.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PostBlockComments({ profileId, replyToCommentOwner, setReplyToCommentOwner, replyToCommentId, setReplyToCommentId, postId, commentsToggled, commentUpdateTracker }) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();
  const router = useRouter();

  useEffect(() => {
    async function getComments() {
      try {
        const firstCall = await api.get(`/api/v1/social/posts/${postId}?_author=true&_comments=true`);
        console.log("api comment data >", firstCall.data);
        setComments(firstCall.data.comments);
        console.log(comments);

      } catch (error) {
        console.log(error);
        setError(error.toString());

      } finally {
        setLoading(false);
      }
    }

    if(commentsToggled) {
      getComments();
    }

  }, [commentsToggled, commentUpdateTracker]);

   if (loading) {
    return(
      <div>
        <p>Loading, please wait!</p>
      </div>
    )
  }

  if (error) {
    console.log(error);
    return(
      <div>
        <p>An error has occured while fetching the comments! {error}</p>
      </div>
    )
  }

  if (comments.length === 0) {
    return(
      <div>
        <p>Be the first one to leave a comment!</p>
      </div>
    )
  }

  function replyToCommentHandler(event) {
    console.log("Reply clicked"); // delete
    setReplyToCommentId(parseInt(event.target.id));
    setReplyToCommentOwner(event.target.dataset.owner);
    let currentRoute = router.pathname;
    if (currentRoute === "/post/[pid]") {
      currentRoute = `/post/${postId}`;
    } else if (currentRoute === "/profile/[profileid]") {
      currentRoute = `/profile/${profileId}`;
    }
    router.push(`${currentRoute}#createComment${postId}`);
  }

  return(
    <Container id="postblockCommentsContainer">
      {comments.map((comment) => {
        const mainCommentReplyToId = comment.replyToId;
        const replyingTo = comments.filter(comment => comment.id === mainCommentReplyToId);
        console.log("replyingto data>", replyingTo);
        return(
            <React.Fragment key={comment.id}>
              <div key={comment.id} className={styles.commentBlock}>
                {comment.replyToId ?                 
                  <div>
                    <h4>Replying to:</h4>
                    <div className={styles.commentsReplyBlock}>
                      {replyingTo.map((mainComment) => {
                        return(
                            <div key={mainComment.id}>
                              <div>
                                <div className={styles.commentOwnerWrapper}>
                                  <Link href={`/profile/${mainComment.owner}`}>
                                    <h3 className={styles.commentOwnerTitle}>{mainComment.owner}</h3>
                                  </Link>
                                </div>
                                <p>Comment <b>#{comment.id}</b></p>
                                <p>{moment(mainComment.created).format("DD. MMMM YYYY, h:mm")}</p>
                              </div>
                              <div className={styles.commentBody}>
                                <p>{mainComment.body}</p>
                              </div>
                            </div>
                        )
                      })}
                    </div>
                </div> : ""}
                <div className={styles.commentTopWrapper}>
                  <div>
                    <div className={styles.commentOwnerWrapper}>
                      <Link href={`/profile/${comment.owner}`}>
                        <h3 className={styles.commentOwnerTitle}>{comment.owner}</h3>
                      </Link>
                    </div>
                    <p>Comment ID <b>#{comment.id}</b></p>
                    <p>{moment(comment.created).format("DD. MMMM YYYY, h:mm")}</p>
                  </div>
                  <i id={comment.id} data-owner={comment.owner} aria-hidden="false" aria-label={`Reply to comment id ${comment.id} by ${comment.owner}`} className="fas fa-reply" onClick={replyToCommentHandler}></i>
                </div>
                <div className={styles.commentBody}>
                  <p>{comment.body}</p>
                </div>
              </div>
              <hr></hr>
            </React.Fragment>
          )
      })}
    </Container>
  )
}
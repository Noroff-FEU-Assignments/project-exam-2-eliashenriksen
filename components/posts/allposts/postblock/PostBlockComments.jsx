import { Container } from "react-bootstrap"
import moment from "moment/moment";
import React, { useEffect, useState} from "react";
import useAxios from "../../../../hooks/useAxios";
import styles from "../../../../styles/PostBlockComments.module.css";
import Link from "next/link";

export default function PostBlockComments({ postId, commentsToggled, commentUpdateTracker }) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

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
                                <p>{moment(mainComment.created).format("DD. MMMM YYYY, h:mm")}</p>
                              </div>
                              <div>
                                <p>{mainComment.body}</p>
                              </div>
                            </div>
                        )
                      })}
                    </div>
                </div> : ""}
                <div>
                  <div className={styles.commentOwnerWrapper}>
                    <Link href={`/profile/${comment.owner}`}>
                      <h3 className={styles.commentOwnerTitle}>{comment.owner}</h3>
                    </Link>
                  </div>
                  <p>{moment(comment.created).format("DD. MMMM YYYY, h:mm")}</p>
                </div>
                <div>
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
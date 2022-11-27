import { Container } from "react-bootstrap"
import moment from "moment/moment";
import React, { useEffect, useState} from "react";
import useAxios from "../../../../hooks/useAxios";
import styles from "../../../../styles/PostBlockComments.module.css";

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
        const mainCommentId = comment.id;
        if (!comment.replyToId) {
          return(
            <React.Fragment key={comment.id}>
              <div key={comment.id}>
                <div>
                  <h3>{comment.owner}</h3>
                  <p>{moment(comment.created).format("DD. MMMM YYYY, h:mm")}</p>
                </div>
                <div>
                  <p>{comment.body}</p>
                </div>
                <div className={styles.commentsReplyHolder}>
                  {comments.map((comment) => {
                    if (comment.replyToId && mainCommentId === comment.replyToId) {
                      return(
                        <div key={comment.id} className={styles.commentsReplyBlock}>
                          <div>
                            <h4>{comment.owner}</h4>
                            <p>{moment(comment.created).format("DD. MMMM YYYY, h:mm")}</p>
                          </div>
                          <p>{comment.body}</p>
                        </div>
                      )
                    }
                  })}
                </div>
                <hr></hr>
              </div>
            </React.Fragment>
          )
        }
      })}
    </Container>
  )
}
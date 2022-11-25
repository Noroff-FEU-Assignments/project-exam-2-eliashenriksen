import { Container } from "react-bootstrap"
import moment from "moment/moment";
import { useEffect, useState} from "react";
import useAxios from "../../../hooks/useAxios";

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

  return(
    <Container id="postblockCommentsContainer">
      {comments.map((comment) => {
        return(
          <div key={comment.id}>
            <div>
              <h3>{comment.owner}</h3>
              <p>{moment(comment.created).format("DD. MMMM YYYY, h:mm")}</p>
            </div>
            {/* {comment.replyToId ? <div>
              {comment.replyToId ? comment.replyToId : ""}
            </div> : ""} */}
            <div>
              <p>{comment.body}</p>
            </div>
            <hr></hr>
          </div>
        )
      })}
    </Container>
  )
}
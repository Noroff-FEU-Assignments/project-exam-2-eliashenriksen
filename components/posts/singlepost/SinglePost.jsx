import useAxios from "../../../hooks/useAxios";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
// import SinglePostBlock from "./postblock/SinglePostBlock";
import PostBlock from "../allposts/postblock/PostBlock";
import styles from "../../../styles/SinglePost.module.css";

export default function SinglePost({ postId }) {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    async function getPost() {
      try {
        const firstCall = await api.get(`/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`);
        console.log("api data for single post >", firstCall.data, firstCall);
        setPost(firstCall.data);

      } catch (error) {
        console.log(error);
        setError(error.toString());

      } finally {
        setLoading(false);
      }
    }

    if (auth) {
      getPost();
    }

  }, []);

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
        <p>An error has occured! Code {error}</p>
      </div>
    )
  }

  return (
    <Container className={styles.singlePostContainer}>
      <h1>{post.title}</h1>
      <PostBlock
      id={postId}
      title={post.title}
      author={post.author}
      body={post.body}
      created={post.created}
      media={post.media}
      reactions={post.reactions}
      tags={post.tags}
      updated={post.updated}
      comments={post.comments}>
      </PostBlock>
    </Container>
  )
}

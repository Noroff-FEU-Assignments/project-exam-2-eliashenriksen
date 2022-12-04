import useAxios from "../../../hooks/useAxios";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import PostBlock from "./postblock/PostBlock";

export default function AllPosts({ postUpdateTracker, apiRoute }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    async function getAllPosts() {
      try {
        const firstCall = await api.get(apiRoute);
        console.log("api data >", firstCall.data, firstCall); // delete console log
        setPosts(firstCall.data);

      } catch (error) {
        console.log(error);
        setError(error.toString());

      } finally {
        setLoading(false);
      }
    }

    if (auth) {
      getAllPosts();
    }

  }, [postUpdateTracker]);

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
    <Container>
      {posts.map((post) => {
        return(
          <PostBlock 
          key={post.id} 
          title={post.title} 
          author={post.author} 
          id={post.id} created={post.created} 
          body={post.body} media={post.media} 
          reactions={post.reactions} 
          tags={post.tags} 
          updated={post.updated} 
          comments={post.comments}>
          </PostBlock>
        )
      })}
    </Container>
  )
}

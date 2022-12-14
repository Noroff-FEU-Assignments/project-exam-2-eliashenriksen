import useAxios from "../../../hooks/useAxios";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import PostBlock from "../../posts/allposts/postblock/PostBlock";

export default function SingleProfilePosts({ profileId }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    async function getAllPosts() {
      try {
        const firstCall = await api.get(`/api/v1/social/profiles/${profileId}/posts?_author=true&_comments=true&_reactions=true&sort=id&sortOrder=desc`);
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
    <Container id={`#postList${profileId}`}>
      {posts.map((post) => {
        return(
          <PostBlock 
          key={post.id} 
          title={post.title} 
          author={post.author} 
          id={post.id}
          created={post.created} 
          body={post.body}
          media={post.media} 
          reactions={post.reactions} 
          tags={post.tags} 
          updated={post.updated} 
          comments={post.comments}
          profileId={profileId}>
          </PostBlock>
        )
      })}
    </Container>
  )
}
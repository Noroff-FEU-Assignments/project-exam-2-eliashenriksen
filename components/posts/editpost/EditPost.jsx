import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import EditPostForm from "../../forms/EditPostForm";

export default function EditPost({ postId }) {

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    async function getPost() {
      try {
        const firstCall = await api.get(`/api/v1/social/posts/${postId}`);
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

  return(
    <EditPostForm postId={postId} prefillTitle={post.title} prefillBody={post.body} prefillTags={post.tags} prefillMedia={post.media}></EditPostForm>
  )
}
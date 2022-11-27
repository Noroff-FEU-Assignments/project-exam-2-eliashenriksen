import Layout from '../components/layout/Layout';
import AllPosts from "../components/posts/allposts/AllPosts";
import useAuthSecurity from "../hooks/useAuthSecurity";
import CreatePost from "../components/posts/allposts/CreatePost";
import { useState } from "react";

export default function Home() {
  useAuthSecurity();

  const [postsUpdated, setPostsUpdated] = useState(0);
  //Check if authenticated in useEffect here, send back to login page if not authenticated

  return (
    <Layout title="All Posts">
      <CreatePost updatePosts={setPostsUpdated} postUpdateTracker={postsUpdated}></CreatePost>
      <AllPosts postUpdateTracker={postsUpdated}></AllPosts>
    </Layout>
  )
}

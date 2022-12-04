import Layout from '../components/layout/Layout';
import AllPosts from "../components/posts/allposts/AllPosts";
import useAuthSecurity from "../hooks/useAuthSecurity";
import { useState } from "react";
import CreatePostForm from "../components/forms/CreatePostForm";

export default function Home() {
  useAuthSecurity();

  const [postsUpdated, setPostsUpdated] = useState(0);
  const apiRoute = "/api/v1/social/posts/?_author=true&_comments=true&_reactions=true&sort=id&sortOrder=desc";

  return (
    <Layout pageTitle="Intouch Home" pageDescription="Share something with the world, or see what others are up to!" title="All Posts">
      <CreatePostForm updatePosts={setPostsUpdated} postUpdateTracker={postsUpdated}></CreatePostForm>
      <AllPosts apiRoute={apiRoute} postUpdateTracker={postsUpdated}></AllPosts>
    </Layout>
  )
}

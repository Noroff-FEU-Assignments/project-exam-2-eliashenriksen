import Layout from '../components/layout/Layout';
import AllPosts from "../components/posts/AllPosts";
import useAuthSecurity from "../hooks/useAuthSecurity";

export default function Home() {
  useAuthSecurity();

  //Check if authenticated in useEffect here, send back to login page if not authenticated

  return (
    <Layout title="All Posts">
      <h2>This is the homepage, add a list of posts under</h2>
      <AllPosts></AllPosts>
    </Layout>
  )
}

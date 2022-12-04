import Layout from "../components/layout/Layout"
import AllPosts from "../components/posts/allposts/AllPosts"

export default function Feed() {

  const apiRoute = "/api/v1/social/posts/following?_author=true&_comments=true&_reactions=true&sort=id&sortOrder=desc";

  return(
    <Layout title="Followed Feed" backButton={true}>
      <AllPosts apiRoute={apiRoute}></AllPosts>
    </Layout>
  )
}
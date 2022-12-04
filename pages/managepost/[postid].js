import useAuthSecurity from "../../hooks/useAuthSecurity";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import EditPost from "../../components/posts/editpost/EditPost";

export default function ManagePost() {
  useAuthSecurity();

  const router = useRouter()
  const { postid } = router.query

  return(
    <Layout pageTitle={`Intouch Manage Post #${postid}`} pageDescription="Edit or delete your Intouch post.">
      <EditPost postId={postid}></EditPost>
    </Layout>
  )
}
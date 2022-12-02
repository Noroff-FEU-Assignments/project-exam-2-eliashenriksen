import Layout from "../../components/layout/Layout"
import { useRouter } from "next/router"
import SinglePost from "../../components/posts/singlepost/SinglePost";
import useAuthSecurity from "../../hooks/useAuthSecurity";

export default function Post() {
  useAuthSecurity();

  const router = useRouter()
  const { pid } = router.query

  return(
    <Layout>
      <SinglePost postId={pid}></SinglePost>
    </Layout>
  )
}

//https://stackoverflow.com/questions/65859612/id-is-gone-when-i-refresh-a-nextjs-dynamic-route-page
export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router"
import SingleProfile from "../../components/profiles/singleprofile/SingleProfile";
import useAuthSecurity from "../../hooks/useAuthSecurity";

export default function Post() {
  useAuthSecurity();

  const router = useRouter()
  const { profileid } = router.query

  //Below i had to add a key to make sure the component re-mounts after going from a random single profile to the logged in users single profile, which is under the
  //same dynamic route.
  return(
    <Layout backButton={true}>
      <SingleProfile key={profileid} profileId={profileid}></SingleProfile>
    </Layout>
  )
}

//https://stackoverflow.com/questions/65859612/id-is-gone-when-i-refresh-a-nextjs-dynamic-route-page
export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
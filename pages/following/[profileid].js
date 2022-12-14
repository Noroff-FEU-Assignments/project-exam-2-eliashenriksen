import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import useAuthSecurity from "../../hooks/useAuthSecurity";
import Following from "../../components/profiles/following/Following";


export default function ProfileFollowing() {
  useAuthSecurity();

  const router = useRouter()
  const { profileid } = router.query


  return(
    <Layout pageTitle={`Intouch ${profileid} Following`} pageDescription={`Find out who ${profileid} is following on Intouch.`} title={`${profileid} is following`} backButton={true}>
      <Following profileId={profileid}></Following>
    </Layout>
  )
}
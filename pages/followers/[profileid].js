import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import useAuthSecurity from "../../hooks/useAuthSecurity";
import Followers from "../../components/profiles/followers/Followers";

export default function ProfileFollowers() {
  useAuthSecurity();

  const router = useRouter()
  const { profileid } = router.query

  return(
    <Layout pageTitle={`Intouch ${profileid} Followers`} pageDescription={`Take a look at ${profileid}'s list of followers on Intouch.`} title={`${profileid}'s followers`} backButton={true}>
      <Followers profileId={profileid}></Followers>
    </Layout>
  )
}
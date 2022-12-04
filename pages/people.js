import useAuthSecurity from "../hooks/useAuthSecurity";
import Layout from "../components/layout/Layout";
import AllProfiles from "../components/profiles/allprofiles/AllProfiles";

export default function People() {
  useAuthSecurity();

  return(
    <Layout title="Find cool new people to follow!" backButton={true}>
      <AllProfiles></AllProfiles>
    </Layout>
  )
}
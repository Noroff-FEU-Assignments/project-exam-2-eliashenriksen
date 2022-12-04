import useAxios from "../../../hooks/useAxios";
import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import ProfileBlock from "./profileblock/ProfileBlock";
import FindSpecificProfile from "./FindSpecificProfile";


export default function AllProfiles() {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    async function getAllProfiles() {
      try {
        const firstCall = await api.get("/api/v1/social/profiles?_following=true&_followers=true");
        setProfiles(firstCall.data);

      } catch (error) {
        console.log(error);
        setError(error.toString());

      } finally {
        setLoading(false);
      }
    }

    if (auth) {
      getAllProfiles();
    }

  }, []);

  if (loading) {
    return(
      <div>
        <p>Loading, please wait!</p>
      </div>
    )
  }

  if (error) {
    console.log(error);
    return(
      <div>
        <p>An error has occured! Code {error}</p>
      </div>
    )
  }

  return (
    <Container>
      <FindSpecificProfile></FindSpecificProfile>
      {profiles.map((profile) => {
        return(
          <ProfileBlock 
          key={profile.name}
          name={profile.name}
          email={profile.email}
          postcount={profile._count.posts}
          followercount={profile._count.followers}
          followingcount={profile._count.following}
          avatar={profile.avatar}
          banner={profile.banner}>
          </ProfileBlock>
        )
      })}
    </Container>
  )
}
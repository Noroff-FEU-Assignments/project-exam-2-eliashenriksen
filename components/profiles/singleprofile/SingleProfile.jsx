import { Container } from "react-bootstrap"
import SingleProfileBlock from "./singleprofileblock/SingleProfileBlock"
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import styles from "../../../styles/SingleProfile.module.css";
import SingleProfilePosts from "./SingleProfilePosts";

export default function SingleProfile({ profileId }) {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const [followUpdate, setFollowUpdate] = useState(1);
  const api = useAxios();


  useEffect(() => {
    async function getProfile() {
      try {
        const firstCall = await api.get(`/api/v1/social/profiles/${profileId}?_following=true&_followers=true`);
        console.log("api data for single post >", firstCall.data, firstCall); //delete console log
        setProfile(firstCall.data);

      } catch (error) {
        console.log(error);
        setError(error);

      } finally {
        setLoading(false);
      }
    }

    if (auth) {
      getProfile();
    }

  }, [followUpdate]);

  if (loading) {
    return(
      <div>
        <p>Loading, please wait!</p>
      </div>
    )
  }

  if (error) {
    console.log(error);
    if (error.response.status === 404) {
      return(
        <div className={styles.error404}>
          <h1>Error 404</h1>
          <p>No user with the username <b>{profileId}</b> could be found.</p>
        </div>
      )
    }
    return(
      <div>
        <p>An error has occured! Code {error.toString()}</p>
      </div>
    )
  }

  return(
    <Container className={styles.singlePostContainer}>
      <SingleProfileBlock
      followUpdate={followUpdate}
      setFollowUpdate={setFollowUpdate}
      name={profile.name}
      email={profile.email}
      postcount={profile._count.posts}
      followercount={profile._count.followers}
      followingcount={profile._count.following}
      avatar={profile.avatar}
      banner={profile.banner}
      followers={profile.followers}>
      </SingleProfileBlock>
      <SingleProfilePosts profileId={profileId}></SingleProfilePosts>
    </Container>
  )
}
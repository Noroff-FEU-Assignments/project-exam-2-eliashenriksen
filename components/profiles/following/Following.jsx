import { Container } from "react-bootstrap"
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import ProfileBlock from "../allprofiles/profileblock/ProfileBlock";
import styles from "../../../styles/Following.module.css";

export default function Following({ profileId }) {

  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const [followUpdate, setFollowUpdate] = useState(1);
  const api = useAxios();


  useEffect(() => {
    async function getProfile() {
      try {
        const firstCall = await api.get(`/api/v1/social/profiles/${profileId}?_following=true&_followers=true`);
        setFollowing(firstCall.data.following);

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

  if (following.length === 0) {
    return(
      <Container className={styles.followingContainer}>
        <p>{profileId} is not currently following anyone</p>
      </Container>
    )
  } else {
      return(
        <Container className={styles.followingContainer}>
          {following.map((profile) => {
            return(
              <ProfileBlock 
              key={profile.name}
              name={profile.name}
              avatar={profile.avatar}>
              </ProfileBlock>
            )
          })}
        </Container>
      )
  }

}
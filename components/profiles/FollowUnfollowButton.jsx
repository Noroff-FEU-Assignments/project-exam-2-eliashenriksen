import { useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";

export default function FollowUnfollowButton({ profileId, followers, followUpdate, setFollowUpdate }) {


  const [auth, setAuth, user, setUser] = useContext(AuthContext);
  const api = useAxios();

  async function followProfile() {
    try {
			const response = await api.put(`/api/v1/social/profiles/${profileId}/follow`);

      if (response.data.name) {
        setFollowUpdate(followUpdate + 1);
      }
			
		} catch (error) {
			console.log(error);
		}
	}

  async function unfollowProfile() {
    try {
			const response = await api.put(`/api/v1/social/profiles/${profileId}/unfollow`);

      if (response.data.name) {
        setFollowUpdate(followUpdate + 1);
      }
			
		} catch (error) {
			console.log(error);
		} 
	}


  const followingTest = followers.map((follower) => {
    if (follower.name === user) {
      return(
        true
      )
    } else {
      return(
        false
      )
    }
  })

  if (followingTest.includes(true)) {
    return(
      <button onClick={unfollowProfile} className="globalButtonStyling buttonDanger"><i className="fas fa-minus"></i> Unfollow</button>
    )
  }

  return(
    <button onClick={followProfile} className="globalButtonStyling buttonPrimary"><i className="fas fa-plus"></i> Follow</button>
  )
}
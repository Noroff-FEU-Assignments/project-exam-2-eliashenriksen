import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext";

export default function FollowUnfollowButton({ profileId, followers, followUpdate, setFollowUpdate }) {


  const [auth, setAuth, user, setUser] = useContext(AuthContext);
	const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);
	const [show, setShow] = useState(false);
  const api = useAxios();

  console.log("followers >>>", followers);

  async function followProfile() {
    try {
			const response = await api.put(`/api/v1/social/profiles/${profileId}/follow`);
			console.log("AXIOS FOLLOW PROFILE RESPONSE:", response); //Delete console log later

      if (response.data.name) {
        console.log("profile followed success");
        setFollowUpdate(followUpdate + 1);
      }
			
		} catch (error) {
			console.log("AXIOS FOLLOW PROFILE ERROR:", error); //Delete console log later
			setPostError(`An error occured while following the profile. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			// setSubmitting(false);
		}
	}

  async function unfollowProfile() {
    try {
			const response = await api.put(`/api/v1/social/profiles/${profileId}/unfollow`);
			console.log("AXIOS UNFOLLOW PROFILE RESPONSE:", response); //Delete console log later

      if (response.data.name) {
        console.log("profile unfollowed success");
        setFollowUpdate(followUpdate + 1);
      }
			
		} catch (error) {
			console.log("AXIOS UNFOLLOW PROFILE ERROR:", error); //Delete console log later
			setPostError(`An error occured while following the profile. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			// setSubmitting(false);
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
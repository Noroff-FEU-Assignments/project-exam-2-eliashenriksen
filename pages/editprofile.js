import Layout from "../components/layout/Layout"
import useAuthSecurity from "../hooks/useAuthSecurity"
import EditProfileForm from "../components/forms/EditProfileForm";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";


export default function EditProfile() {
  useAuthSecurity();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth, user, setUser] = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const firstCall = await api.get(`/api/v1/social/profiles/${user}`);
        console.log("api data for single profile >", firstCall.data, firstCall); // delete console log
        setProfile(firstCall.data);

      } catch (error) {
        console.log(error);
        setError(error.toString());

      } finally {
        setLoading(false);
      }
    }

    if (auth) {
      getProfile();
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

  return(
    <Layout pageTitle="Intouch Edit Profile" pageDescription="Edit your Intouch profile.">
      <EditProfileForm name={profile.name} email={profile.email} avatar={profile.avatar} banner={profile.banner}></EditProfileForm>
    </Layout>
  )
}
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import styles from "../../styles/EditPostForm.module.css";
import { useRouter } from "next/router";

export default function EditProfileForm({ name, email, avatar, banner }) {


  const urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const urlMatcher = new RegExp(urlExpression);

	// .matches(urlMatcher, "Please provide a valid image URL")

  const schema = yup.object().shape({
    banner: yup.string(),
    avatar: yup.string(),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	
	const [submitting, setSubmitting] = useState(false);
	const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);
  const api = useAxios();
	const router = useRouter();

  async function onSubmit(data) {
		setSubmitting(true);
		setPostError(null);
		console.log(data); // delete

		try {
			const response = await api.put(`/api/v1/social/profiles/${name}/media`, data);
			console.log("AXIOS UPDATE PROFILE RESPONSE:", response); //Delete console log later

      if (response.data.name) {
        setPostSuccess("Profile updated succesfully!");
        router.push(`/profile/${name}`);
				// setTimeout(() => {
				// 	router.push(`/profile/${name}`);
				// }, 3000);
      }
			
		} catch (error) {
			console.log("AXIOS UPDATE PROFILE ERROR:", error); //Delete console log later
			setPostError(`An error occured while updating your profile. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}

	function cancelEdit() {
		router.push(`/profile/${name}`);
	}

  return(
    <>
      <h1 className={styles.formH1}>{name}</h1>
      <p>{email}</p>
      <form className={styles.editPostForm} onSubmit={handleSubmit(onSubmit)}>
        {postSuccess && <span>{postSuccess}</span>}
        {postError && <span>{postError}</span>}
        <fieldset disabled={submitting}>

          <div className={styles.formInputWrapper}>
            <div className={styles.formInputSpanWrapper}>
              {errors.banner && <span>{errors.banner.message}</span>}
            </div>
            <label>Banner Image URL</label>
            <input name="banner" placeholder="Banner Image URL (optional)" defaultValue={banner} {...register("banner")} />
          </div>

          <div className={styles.formInputWrapper}>
            <div className={styles.formInputSpanWrapper}>
              {errors.avatar && <span>{errors.avatar.message}</span>}
            </div>
            <label>Avatar Image URL</label>
            <input name="avatar" placeholder="Avatar Image URL (optional)" defaultValue={avatar} {...register("avatar")} />
          </div>

          <div className={styles.formButtonWrapper1}>
            <button className="globalButtonStyling buttonPrimary"><i className="far fa-save"></i> Save Changes</button>
            <button className="globalButtonStyling buttonSecondary" type="button" onClick={cancelEdit}>Cancel</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
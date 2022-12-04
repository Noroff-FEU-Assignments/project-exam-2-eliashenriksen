import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import styles from "../../styles/EditPostForm.module.css";
import { useRouter } from "next/router";

export default function EditProfileForm({ name, email, avatar, banner }) {

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

		try {
			const response = await api.put(`/api/v1/social/profiles/${name}/media`, data);

      if (response.data.name) {
        setPostSuccess("Profile updated succesfully!");
        router.push(`/profile/${name}`);
      }
			
		} catch (error) {
			console.log(error);
			setPostError(`An error occured while updating your profile. ${error.toString()}`);
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
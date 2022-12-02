import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import styles from "../../styles/CreatePostForm.module.css";

export default function CreatePostForm({ postUpdateTracker, updatePosts}) {


  const urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const urlMatcher = new RegExp(urlExpression);

	// .matches(urlMatcher, "Please provide a valid image URL")

  const schema = yup.object().shape({
    title: yup.string().required("Please enter a title"),
    body: yup.string(),
    // tags: yup.string() array of strings,
    media: yup.string(),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	const [submitting, setSubmitting] = useState(false);
	const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);
  const api = useAxios();


  async function onSubmit(data) {
		setSubmitting(true);
		setPostError(null);
		console.log(data); // delete

		try {
			const response = await api.post(`/api/v1/social/posts`, data);
			console.log("AXIOS CREATE POST RESPONSE:", response); //Delete console log later

      if (response.data.id) {
        setPostSuccess("Post created!");
				reset();
				updatePosts(postUpdateTracker + 1);
      }
			
		} catch (error) {
			console.log("AXIOS CREATE POST ERROR:", error); //Delete console log later
			setPostError(`An error occured while creating your post. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}

  return(
    <>
			<form className={styles.createPostForm} onSubmit={handleSubmit(onSubmit)}>
        {postSuccess && <span>{postSuccess}</span>}
				{postError && <span>{postError}</span>}
				<fieldset disabled={submitting}>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.title && <span>{errors.title.message}</span>}
						</div>
            <input name="title" placeholder="Title" {...register("title")} />
					</div>

					<div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.media && <span>{errors.media.message}</span>}
						</div>
            <input name="media" placeholder="Image URL (optional)" {...register("media")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.body && <span>{errors.body.message}</span>}
						</div>
            <textarea name="body" placeholder="Your message" {...register("body")} />
					</div>

					<div className={styles.formButtonWrapper1}>
						<button className="globalButtonStyling buttonPrimary"><i className="fas fa-plus"></i> Create Post</button>
					</div>
				</fieldset>
			</form>
			<hr></hr>
		</>
  )
}
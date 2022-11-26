import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import styles from "../../../styles/PostBlockCreateComment.module.css";

export default function PostBlockCreateComment({ postId, updateComments, commentUpdateTracker, toggleComments, commentsToggled }) {

  const schema = yup.object().shape({
    body: yup.string().required("Please enter a message"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	const [submitting, setSubmitting] = useState(false);
	const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const api = useAxios();


  async function onSubmit(data) {
		setSubmitting(true);
		setCommentError(null);
		console.log(data);

		try {
			const response = await api.post(`/api/v1/social/posts/${postId}/comment`, data);
			console.log("AXIOS CREATE COMMENT RESPONSE:", response); //Delete console log later

      if (response.data.id) {
				if (!commentsToggled) {
					toggleComments(true);
				}
        setCommentSuccess("Comment posted!");
				updateComments(commentUpdateTracker + 1);
				reset();
      }
			
		} catch (error) {
			console.log("AXIOS CREATE COMMENT ERROR:", error); //Delete console log later
			setCommentError("An error occured while posting your comment."); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}

  return(
    <>
			<form className={styles.createCommentForm} onSubmit={handleSubmit(onSubmit)}>
        {commentSuccess && <span>{commentSuccess}</span>}
				{commentError && <span>{commentError}</span>}
				<fieldset disabled={submitting}>
					<div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.body && <span>{errors.body.message}</span>}
						</div>
            <textarea name="body" placeholder="Your message" {...register("body")} />
					</div>

					<div className={styles.formButtonWrapper1}>
						<button className="globalButtonStyling buttonPrimary"><i className="far fa-comment"></i> Post Comment</button>
					</div>
				</fieldset>
			</form>
			<hr></hr>
		</>
  )
}
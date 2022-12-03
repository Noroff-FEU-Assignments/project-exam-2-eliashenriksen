import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../../../constants/api";
import useAxios from "../../../../hooks/useAxios";
import styles from "../../../../styles/PostBlockCreateComment.module.css";

export default function PostBlockCreateComment({ replyToCommentOwner, setReplyToCommentOwner, replyToCommentId, setReplyToCommentId, postId, updateComments, commentUpdateTracker, toggleComments, commentsToggled }) {

	//For whatever ungodly reason, if a react hook form input that is supposed to be a number is empty, it gets sent as an empty string. But it cannot be sent as an 
	//empty string because it must be a number? This exact issue was really annoying to find a solution (its not as easy to fix as it might seem) and most solutions
	//seemed overcomplicated. I ended up finally finding my own where i basically just hide the whole input if the "replyToCommentId" state variable has a falsy value.
	//I will attribute not instantly coming up with this simple solution to lack of sleep.
  const schema = yup.object().shape({
    body: yup.string().required("Please enter a message"),
		replyToId: yup.number(),
  });

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	const [submitting, setSubmitting] = useState(false);
	const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const api = useAxios();

  async function onSubmit(data) {
		setSubmitting(true);
		setCommentError(null);
		console.log("create comment data >>", data); //delete

		try {
			const response = await api.post(`/api/v1/social/posts/${postId}/comment`, data);
			console.log("AXIOS CREATE COMMENT RESPONSE:", response); //Delete console log later

      if (response.data.id) {
				if (!commentsToggled) {
					toggleComments(true);
				}
        setCommentSuccess("Comment posted!");
				updateComments(commentUpdateTracker + 1);
				setReplyToCommentId(null);
				reset();
      }
			
		} catch (error) {
			console.log("AXIOS CREATE COMMENT ERROR:", error); //Delete console log later
			setCommentError("An error occured while posting your comment."); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}

		useEffect(() => {
		if (replyToCommentId) {
			const commentOwner = replyToCommentOwner;
			setReplyToCommentOwner(commentOwner);
			console.log("useffeect called", replyToCommentId);
			setValue('replyToId', parseInt(replyToCommentId));
		}
	},[replyToCommentId])

	function cancelReply() {
		setReplyToCommentId(null);
	}

  return(
    <>
			<form id={`createComment${postId}`} className={styles.createCommentForm} onSubmit={handleSubmit(onSubmit)}>
        {commentSuccess && <span>{commentSuccess}</span>}
				{commentError && <span>{commentError}</span>}
				<fieldset disabled={submitting}>

					{replyToCommentId ? 
					<div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.replyToId && <span>{errors.replyToId.message}</span>}
						</div>
						<div className={styles.formInputLabelWrapper}>
							<label className={styles.replyToIdLabel}>Replying to <b>{replyToCommentOwner}&apos;s</b> comment <b>#{replyToCommentId}</b></label>
							<i className="fas fa-times globalButtonStyling buttonSecondary" onClick={cancelReply}></i>
						</div>
            <input hidden disabled name="replyToId" placeholder="Replying to" defaultValue={replyToCommentId} {...register("replyToId")} />
					</div> : ""}

					<div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.body && <span>{errors.body.message}</span>}
						</div>
            <textarea id="postBlockCreateCommentTextarea" name="body" placeholder="Your message" {...register("body")} />
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
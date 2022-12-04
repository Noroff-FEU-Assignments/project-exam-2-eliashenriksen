import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import styles from "../../styles/EditPostForm.module.css";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EditPostForm({ postId, prefillTitle, prefillBody, prefillTags, prefillMedia }) {


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
	const [show, setShow] = useState(false);
  const api = useAxios();
	const router = useRouter();

	const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function onSubmit(data) {
		setSubmitting(true);
		setPostError(null);
		console.log(data); // delete

		try {
			const response = await api.put(`/api/v1/social/posts/${postId}`, data);
			console.log("AXIOS UPDATE POST RESPONSE:", response); //Delete console log later

      if (response.data.id) {
        setPostSuccess("Post updated succesfully!");
				router.push(`/post/${postId}`);
				// setTimeout(() => {
				// 	router.push(`/post/${postId}`);
				// }, 3000);
      }
			
		} catch (error) {
			console.log("AXIOS UPDATE POST ERROR:", error); //Delete console log later
			setPostError(`An error occured while updating your post. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}


	async function deletePost() {
		try {
			const response = await api.delete(`/api/v1/social/posts/${postId}`);
			console.log("AXIOS DELETE POST RESPONSE:", response); //Delete console log later

      if (response.status === 200) {
				router.push(`/home`);
      }
			
		} catch (error) {
			console.log("AXIOS DELETE POST ERROR:", error); //Delete console log later
			setPostError(`An error occured while deleting your post. ${error.toString()}`); //Add custom error messages based on error code
		} finally {
			setSubmitting(false);
		}
	}

	function cancelEdit() {
		router.push(`/post/${postId}`);
	}

  return(
    <>
			<h1 className={styles.formH1}>Manage Post</h1>
			<Modal className={styles.modalWhole} show={show} onHide={handleClose} contentClassName={styles.modalContent}>
        <Modal.Header>
          <Modal.Title>
						<h4 className={styles.modalTitle}>Please confirm the deletion of your post</h4>
					</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
					<p>Are you sure you wish to delete your post?</p>
					<p>This cannot be undone.</p>
				</Modal.Body>
        <Modal.Footer>
          <Button className="globalButtonStyling buttonSecondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="globalButtonStyling buttonPrimary" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
			<form className={styles.editPostForm} onSubmit={handleSubmit(onSubmit)}>
        {postSuccess && <span>{postSuccess}</span>}
				{postError && <span>{postError}</span>}
				<fieldset disabled={submitting}>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.title && <span>{errors.title.message}</span>}
						</div>
						<label>Title</label>
            <input name="title" placeholder="Title" defaultValue={prefillTitle} {...register("title")} />
					</div>

					<div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.media && <span>{errors.media.message}</span>}
						</div>
						<label>Media URL</label>
            <input name="media" placeholder="Image URL (optional)" defaultValue={prefillMedia} {...register("media")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.body && <span>{errors.body.message}</span>}
						</div>
						<label>Your message</label>
            <textarea name="body" placeholder="Your message" defaultValue={prefillBody} {...register("body")} />
					</div>

					<div className={styles.formButtonWrapper1}>
						<button onClick={handleShow} className="globalButtonStyling buttonDanger" type="button"><i className="fas fa-trash-alt"></i> Delete Post</button>
						<button className="globalButtonStyling buttonPrimary"><i className="far fa-save"></i> Save Changes</button>
						<button className="globalButtonStyling buttonSecondary" type="button" onClick={cancelEdit}>Cancel</button>
					</div>
				</fieldset>
			</form>
			<hr></hr>
		</>
  )
}
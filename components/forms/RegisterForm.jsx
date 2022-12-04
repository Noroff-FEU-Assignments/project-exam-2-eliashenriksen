import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import { useRouter } from "next/router";
import styles from "../../styles/RegisterForm.module.css";



export default function RegisterForm() {

  const schema = yup.object().shape({
    name: yup.string().required("Please enter a username"),
    email: yup.string().email("Please enter an e-mail that ends with @noroff.no or @stud.noroff.no (this does not need to be a real e-mail adress)").required("Please enter an e-mail that ends with @noroff.no or @stud.noroff.no (this does not need to be a real e-mail adress"),
    password: yup.string().required("Please enter a password (minimum 8 characters)").min(8, "The password must be at least 8 characters long"),
    avatar: yup.string(),
    banner: yup.string(),

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	const [submitting, setSubmitting] = useState(false);
	const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);


  const router = useRouter();

	async function onSubmit(data) {
		setSubmitting(true);
		setRegisterError(null);
		console.log(data); // delete

		try {
			const response = await axios.post(BASE_URL + "/api/v1/social/auth/register", data);
			console.log("AXIOS REGISTER RESPONSE:", response);
    
      if (response.data.id) {
        function redirectToLogin() {
          router.push("/");
        }
        setRegisterSuccess(`User created succesfully! Redirecting back to login page in 3 seconds`);
        setTimeout(redirectToLogin, 3000);
      }
		} catch (error) {
			if (error.response.status === 400) {
				setRegisterError("Avatar / Banner URL must be a valid image URL");
			} else {
				setRegisterError(`An error occured while registering. Error code : ${error}`);
			}
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        {registerSuccess && <span>{registerSuccess}</span>}
				{registerError && <span>{registerError}</span>}
				<fieldset disabled={submitting}>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.name && <span>{errors.name.message}</span>}
						</div>
						<input name="name" placeholder="Username" {...register("name")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.email && <span>{errors.email.message}</span>}
						</div>
						<input name="email" placeholder="E-mail" {...register("email")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.password && <span>{errors.password.message}</span>}
						</div>
						<input name="password" placeholder="Password" type="password" {...register("password")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.avatar && <span>{errors.avatar.message}</span>}
						</div>
						<input name="avatar" placeholder="Avatar URL (Optional)" {...register("avatar")} />
					</div>

          <div className={styles.formInputWrapper}>
						<div className={styles.formInputSpanWrapper}>
							{errors.banner && <span>{errors.banner.message}</span>}
						</div>
						<input name="banner" placeholder="Banner URL (Optional)" {...register("banner")} />
					</div>

					<div className={styles.formButtonWrapper1}>
						<div className={styles.formButtonWrapper2}>
							<button className="globalButtonStyling buttonPrimary">{submitting ? "Working..." : "Register"}</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
}
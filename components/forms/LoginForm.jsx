import { useState, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/LoginForm.module.css";


export default function LoginForm() {

  const schema = yup.object().shape({
    email: yup.string().required("Please enter your registered email").email("Please enter a valid registered email"),
    password: yup.string().required("Please enter your password"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});

	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const [auth, setAuth, user, setUser] = useContext(AuthContext);
  const router = useRouter();

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		try {
			const response = await axios.post(BASE_URL + "/api/v1/social/auth/login", data);

      if (response.data.accessToken) {
				setAuth(response.data.accessToken);
				setUser(response.data.name);
        router.push("/home");
      }

		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
				setLoginError("Incorrect username or password.");
			} else {
				setLoginError("An error occured while signing in.");
			}
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	}

  function redirectToRegister() {
		router.push("/register");
  }

	return (
		<>
			<p>Please login</p>
			<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
				{loginError && <span>{loginError}</span>}
				<fieldset disabled={submitting}>
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
						<input name="password" placeholder="Password" {...register("password")} type="password" />
					</div>

					<div className={styles.formButtonWrapper1}>
						<div className={styles.formButtonWrapper2}>
							<button className="globalButtonStyling buttonPrimary">Login</button>
							<button className="globalButtonStyling buttonSecondary" onClick={redirectToRegister} type="button">Register</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
}
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import { useRouter } from "next/router";



export default function RegisterForm() {

  const schema = yup.object().shape({
    name: yup.string().required("Please enter a username"),
    email: yup.string().email("Please enter a valid stud.noroff.no or noroff.no e-mail adress").required("Please enter a stud.noroff.no or noroff.no e-mail adress"),
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
		console.log(data);

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
			console.log("AXIOS REGISTER ERROR:", error);
			setRegisterError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        {registerSuccess && <span>{registerSuccess}</span>}
				{registerError && <span>{registerError}</span>}
				<fieldset disabled={submitting}>

          <div className="formInputWrapper">
            {errors.name && <span>{errors.name.message}</span>}
						<input name="name" placeholder="Username" {...register("name")} />
					</div>

          <div className="formInputWrapper">
            {errors.email && <span>{errors.email.message}</span>}
						<input name="email" placeholder="E-mail" {...register("email")} />
					</div>

          <div className="formInputWrapper">
            {errors.password && <span>{errors.password.message}</span>}
						<input name="password" placeholder="Password" type="password" {...register("password")} />
					</div>

          <div className="formInputWrapper">
            {errors.avatar && <span>{errors.avatar.message}</span>}
						<input name="avatar" placeholder="Avatar URL" {...register("avatar")} />
					</div>

          <div className="formInputWrapper">
            {errors.banner && <span>{errors.banner.message}</span>}
						<input name="banner" placeholder="Banner URL" {...register("banner")} />
					</div>

					<button>{submitting ? "Working..." : "Register"}</button>
				</fieldset>
			</form>
		</>
	);
}
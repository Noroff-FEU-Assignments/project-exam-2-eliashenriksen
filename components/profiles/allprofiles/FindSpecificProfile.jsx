import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import styles from "../../../styles/FindSpecificProfile.module.css";
import { useState } from "react";

export default function FindSpecificProfile() {

  const schema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), 
	});


  const [color, setColor] = useState("#3d405718");
  const router = useRouter();

	async function onSubmit(data) {
		console.log("search profile submit data", data.username); // delete console log
    router.push(`/profile/${data.username}`);
	}

  // function redirectToRegister() {
	// 	router.push("/register");
  // }

  function focusColor() {
    setColor("#FF287D");
  }

  function blurColor() {
    setColor("#3d405718");
  }

  return(
    <form className={styles.findUserForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Search for a specific user by username (case sensitive)</h2>
      <fieldset>
        <div className={styles.formInputWrapper}>
          <div className={styles.formInputSpanWrapper}>
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className={styles.findUserFormInputWrapper}>
            <p style={{color: color}}>@</p>
            <input id="findSpecificProfileInput" name="username" placeholder="Username" {...register("username")} onFocus={focusColor} onBlur={blurColor}/>
            <button className={`globalButtonStyling buttonPrimary ${styles.formButton}`}>Search</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuthSecurity() {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(!auth) {
      router.push("/");
    }
  }, []);
  
}
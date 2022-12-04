import Layout from '../components/layout/Layout';
import LoginForm from '../components/forms/LoginForm';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  useEffect( function() {
    if(auth) {
      router.push("/home");
    }
  }, [])



  return (
    <Layout pageTitle="Intouch Login" pageDescription="Please login to proceed to Intouch or register an account if you are a new member." title="Welcome to Intouch!">
      <LoginForm></LoginForm>
    </Layout>
  )
}

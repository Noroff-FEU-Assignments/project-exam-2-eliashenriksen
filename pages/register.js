import Layout from '../components/layout/Layout';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {

  return (
    <Layout pageTitle="Intouch Register" pageDescription="Register as a Intouch member!" backButton={true}>
      <p>Please fill in the information below</p>
      <RegisterForm></RegisterForm>
    </Layout>
  )
}

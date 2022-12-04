import Layout from '../components/layout/Layout';
import RegisterForm from '../components/forms/RegisterForm';

export default function Register() {

  return (
    <Layout backButton={true}>
      <p>Please fill in the information below.</p>
      <RegisterForm></RegisterForm>
    </Layout>
  )
}

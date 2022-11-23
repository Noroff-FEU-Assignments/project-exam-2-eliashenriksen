import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { AuthProvider } from '../context/AuthContext';


function MyApp({ Component, pageProps }) {
  return(  
    <>
      <AuthProvider>
        <Head>
        </Head>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous"></Script>
        <Script src="https://kit.fontawesome.com/39e28824ea.js" crossOrigin="anonymous"></Script>
        <Component {...pageProps} />
      </AuthProvider>
    </>
    )
}

export default MyApp;

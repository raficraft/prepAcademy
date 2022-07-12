import "../styles/globals.css";
import "../styles/designSystem.scss";
import Layout from "../core/components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

import "../styles/globals.css";
import "../styles/designSystem.scss";
import Layout from "../core/components/Layout/Layout";
import UIProvider from "../core/context/UIProvider/UIProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  );
}

export default MyApp;

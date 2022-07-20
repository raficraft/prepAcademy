import "../styles/globals.css";
import "../styles/designSystem.scss";
import Layout from "../core/components/Layout/Layout";
import UIProvider from "../core/context/UIProvider/UIProvider";
import { I18nContextProvider } from "../core/context/I18nProvider/I18nProvider";

function MyApp({ Component, pageProps }) {
  return (
    <I18nContextProvider>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </I18nContextProvider>
  );
}

export default MyApp;

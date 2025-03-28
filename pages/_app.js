import App from "next/app";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "../styles/theme.css";

class Space extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    );
  }
}

export default Space;

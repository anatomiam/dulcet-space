import App from "next/app";
import { Layout } from "../components/Layout";

class Space extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Layout theme="dark">
        <Component {...pageProps} key={router.route} />
      </Layout>
    );
  }
}

export default Space;

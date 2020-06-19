import { AnimatePresence } from "framer-motion";
import App from "next/app";
import { Layout } from "../components/Layout";

class Space extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout theme="dark">
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    );
  }
}

export default Space;

import { AnimatePresence } from "framer-motion";
import App from "next/app";
import { Layout } from "../components/Layout";

class Space extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Layout theme="dark">
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    );
  }
}

export default Space;

import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const textVariants = {
  exit: {
    y: -200,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0,
      type: "spring",
      damping: 12,
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const Index = () => {
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={textVariants}
          >
            <h1 className="title">Hey, I&apos;m Eric.</h1>
            <h2 className="subtitle">I design and build websites.</h2>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--dark);
        }
        .subtitle {
          margin: 0;
          line-height: 1.5;
          font-size: var(--text-large);
          color: var(--medium);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default Index;

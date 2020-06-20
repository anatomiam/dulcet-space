import Head from "next/head";
import { motion } from "framer-motion";

const textVariants = {
  exit: {
    x: 200,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0,
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const Future = () => {
  return (
    <div className="container">
      <Head>
        <title>Future</title>
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
            <p className="description">It's not what it used to be.</p>
          </motion.div>
        </section>
      </main>
      <style jsx>{`
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default Future;

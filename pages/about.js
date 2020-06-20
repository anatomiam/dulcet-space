import Head from "next/head";
import { motion } from "framer-motion";

const textVariants = {
  exit: {
    y: 200,
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

const About = () => {
  return (
    <div className="container">
      <Head>
        <title>About</title>
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
            <h1 className="title">Full Stack Developer</h1>

            <p className="description">
              Focused on the modern Javascript ecosystem.
            </p>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--dark);
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--medium);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default About;

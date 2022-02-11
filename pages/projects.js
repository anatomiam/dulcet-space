import Head from "next/head";
import Link from "next/link";
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
        <title>Projects</title>
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
            <ul>
              <li>
                <Link href="/haiku">
                  <a>haiku</a>
                </Link>
              </li>
              <li>
                <Link href="/sequencer">
                  <a>sequencer</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.knobnotes.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  knob notes
                </a>
              </li>
            </ul>
          </motion.div>
        </section>
      </main>
      <style jsx>{`
        a {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
        }
      `}</style>
    </div>
  );
};

export default Future;

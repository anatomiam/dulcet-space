import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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

const Contact = () => {
  return (
    <div className="container">
      <Head>
        <title>Contact</title>
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
            <h1 className="name">Eric Dulcet</h1>
            <h2 className="title">Full Stack Developer</h2>
            <p className="description">
              Focused on the modern Javascript ecosystem.
            </p>
            <h4 className="subtitle">Links</h4>
            <ul>
              <li>
                <a
                  className="link"
                  href="https://www.linkedin.com/in/ericdulcet"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                  <span className="link-text">Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href="https://github.com/anatomiam"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                  <span className="link-text">Github</span>
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href="https://www.instagram.com/dulce1et"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                  <span className="link-text">Instagram</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        ul {
          margin: 1rem;
        }
        a {
          display: flex;
          align-items: center;
        }
        .description {
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--dark);
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-large);
          color: var(--light);
        }
        .link {
          line-height: 1.5;
          font-size: var(--text-small);
          color: var(--light);
        }
        .subtitle {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-medium);
          color: var(--medium);
        }
        .name {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--medium);
        }
        .link-text {
          margin-left: 0.5rem;
          color: var(--medium);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default Contact;

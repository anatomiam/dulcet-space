import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";

import Head from "next/head";
import styles from "../styles/index.module.css";

// import { useEffect, useState } from "react";

const Contact = () => {
  //   const words = [
  //     "front end",
  //     "back end",
  //     "middleware",
  //     "design",
  //     "chatbots",
  //     "mobile apps",
  //     "ETL scripts",
  //     "newsletters",
  //     "SEO",
  //     "CWV",
  //     "CMS customization",
  //     "ads",
  //     "personalization",
  //     "product recommendation",
  //     "graphql",
  //     "APIs",
  //     "CI/CD",
  //     "NLP",
  //   ];

  //   const Word = ({ word }) => {
  //     return <span className={styles.highlight}>{word}, </span>;
  //   };

  return (
    <div className={styles.container}>
      <Head>
        <title>️Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={styles.section}>
          <div>
            <h1 className={styles.name}>Eric Dulcet</h1>
            <h2 className={styles.title}>Software Engineer</h2>
            {/* <p className={styles.description}>
            {words.map((word) => {
              return <Word word={word} key={word} />;
            })}
          </p> */}
            <h4 className={styles.subtitle}>Contact</h4>
            <ul>
              <li>
                <a
                  className={styles.link}
                  href="mailto:etdulcet@gmail.com?subject=Work%20Inquiry:%20[Your%20Name]"
                  target="_blank"
                >
                  <FaEnvelope />
                  <span className={styles.link_text}>Email</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href="https://github.com/anatomiam"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                  <span className={styles.link_text}>Github</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href="https://www.linkedin.com/in/ericdulcet"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                  <span className={styles.link_text}>Linkedin</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;

import * as yup from "yup";

import React, { useState } from "react";

import { Formik } from "formik";
import Head from "next/head";
import axios from "axios";
import { FaQuestionCircle } from 'react-icons/fa';
import styles from '../styles/haiku.module.css';

const validationSchema = yup.object().shape({
  line_1: yup.string().required("Required"),
  line_2: yup.string().required("Required"),
  line_3: yup.string().required("Required"),
});

const Input = () => {
  const [newLines, setNewLines] = useState({
    new_line_1: ".",
    new_line_2: ".",
    new_line_3: ".",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [syllableCounts, setSyllableCounts] = useState({
    line_1: 5,
    line_2: 7,
    line_3: 5,
  });

  const handleKeyUp = (event) => {
    // TODO debounce this
    axios
      .post("/api/haiku/syllable_count", {
        line: event.target.value,
        name: event.target.name,
      })
      .then((response) => {
        setSyllableCounts({
          ...syllableCounts,
          ...{
            [response.data.name]: response.data.syllables,
          },
        });
      })
      .catch((error) => {});
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Parallel Haiku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.haikuContainer}>
          <Formik
            initialValues={{
              line_1: "An old silent pond",
              line_2: "A frog jumps into the pond",
              line_3: "Splash! Silence again",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setIsLoading(true);
              axios
                .post("/api/haiku/submit", {
                  line_1: values.line_1,
                  line_2: values.line_2,
                  line_3: values.line_3,
                })
                .then((response) => {
                  setNewLines({
                    new_line_1: response.data[0][0].join(" "),
                    new_line_2: response.data[0][1].join(" "),
                    new_line_3: response.data[0][2].join(" "),
                  });
                })
                .catch((error) => {})
                .finally(() => {
                  setIsLoading(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  className={`${styles.input} ${
                    errors.line_1 && touched.line_1 ? styles.hasError : null
                  }`}
                  id="line_1"
                  name="line_1"
                  type="text"
                  onChange={handleChange}
                  onKeyUp={(e) => handleKeyUp(e)}
                  value={values.line_1}
                />
                <span className={styles.line}>{syllableCounts.line_1}</span>
                <input
                  className={`${styles.input} ${
                    errors.line_2 && touched.line_2 ? styles.hasError : null
                  }`}
                  id="line_2"
                  name="line_2"
                  type="text"
                  onChange={handleChange}
                  onKeyUp={(e) => handleKeyUp(e)}
                  value={values.line_2}
                />
                <span className={styles.line}>{syllableCounts.line_2}</span>
                <input
                  className={`${styles.input} ${
                    errors.line_3 && touched.line_3 ? styles.hasError : null
                  }`}
                  id="line_3"
                  name="line_3"
                  type="text"
                  onChange={handleChange}
                  onKeyUp={(e) => handleKeyUp(e)}
                  value={values.line_3}
                />
                <span className={styles.line}>{syllableCounts.line_3}</span>
                <div className={styles.buttonContainer}>
                  <div className={styles.helpIcon}>
                    <FaQuestionCircle size={20} />
                    <div className={styles.tooltip}>
                      <p>Enter a haiku following the traditional 5-7-5 syllable pattern. The numbers below each line show the current syllable count. Click submit to generate a parallel haiku.</p>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Generating..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className={styles.newHaiku}>
          <span className={styles.line}>{newLines.new_line_1}</span>
          <span className={styles.line}>{newLines.new_line_2}</span>
          <span className={styles.line}>{newLines.new_line_3}</span>
        </div>
      </main>
    </div>
  );
};

export default Input;

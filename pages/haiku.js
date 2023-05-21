import * as yup from "yup";

import React, { useState } from "react";

import { Formik } from "formik";
import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";

const textVariants = {
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0,
      type: "spring",
      damping: 12,
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

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

  const [syllableCounts, setSyllableCounts] = useState({
    line_1: 0,
    line_2: 0,
    line_3: 0,
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
    <div>
      <Head>
        <title>Parallel Haiku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={textVariants}
        >
          <div className="haiku-container">
            <Formik
              initialValues={{
                line_1: "An old silent pond",
                line_2: "A frog jumps into the pond",
                line_3: "Splash! Silence again",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
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
                  .catch((error) => {});
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
                    className={`input ${
                      errors.line_1 && touched.line_1 ? "has-error" : null
                    }`}
                    id="line_1"
                    name="line_1"
                    type="text"
                    onChange={handleChange}
                    onKeyUp={(e) => handleKeyUp(e)}
                    value={values.line_1}
                  />
                  <span>{syllableCounts.line_1}</span>
                  <input
                    className={`input ${
                      errors.line_2 && touched.line_2 ? "has-error" : null
                    }`}
                    id="line_2"
                    name="line_2"
                    type="text"
                    onChange={handleChange}
                    onKeyUp={(e) => handleKeyUp(e)}
                    value={values.line_2}
                  />
                  <span>{syllableCounts.line_2}</span>
                  <input
                    className={`input ${
                      errors.line_3 && touched.line_3 ? "has-error" : null
                    }`}
                    id="line_3"
                    name="line_3"
                    type="text"
                    onChange={handleChange}
                    onKeyUp={(e) => handleKeyUp(e)}
                    value={values.line_3}
                  />
                  <span>{syllableCounts.line_3}</span>
                  <div className="button-container">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="new-haiku">
            <span>{newLines.new_line_1}</span>
            <span>{newLines.new_line_2}</span>
            <span>{newLines.new_line_3}</span>
          </div>
        </motion.div>
      </main>
      <style jsx>{`
        .haiku-container {
          width: 40vw;
        }
        .input {
          width: 100%;
          display: block;
          background-color: inherit;
          border: none;
          outline: none;
          border-bottom: 1px solid var(--dark);
          color: var(--light);
          font-size: 1.5rem;
          padding: 1.5rem 1rem 0.5rem 1rem;
        }
        .input:focus {
          border-bottom: 2px solid var(--light);
        }
        .has-error {
          border-bottom: 2px solid var(--error);
        }
        .button-container {
          text-align: right;
        }
        button[type="submit"] {
          margin: 15px 0 5px 0;
          padding: 0.5rem;
          border: none;
          border-radius: 5px;
          background-color: var(--dark);
          color: var(--light);
        }
        span {
          text-align: center;
          display: block;
          line-height: 1.5;
          font-size: var(--text-medium);
          color: var(--medium);
        }
      `}</style>
    </div>
  );
};

export default Input;

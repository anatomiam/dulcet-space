import React, { Component, useState } from "react";

import Head from "next/head";
import axios from "axios";
import { useFormik } from "formik";

const Input = () => {
  const syllables = [5, 7, 5];
  const [newLines, setNewLines] = useState({
    new_line_1: ".",
    new_line_2: ".",
    new_line_3: ".",
  });

  const checkSyllables = (lines, num) => {
    return lines === num;
  };

  const handleKeyUp = (event) => {
    axios
      .post("/api/haiku/syllable_count", {
        line: event.target.value,
        name: event.target.name,
      })
      .then((response) => {
        setNewLines({
          ...newLines,
          ...{
            ["new_" + response.data.name]: response.data.syllables,
          },
        });
      })
      .catch((error) => {});
  };

  const formik = useFormik({
    initialValues: {
      line_1: "An old silent pond",
      line_2: "A frog jumps into the pond",
      line_3: "Splash! Silence again",
    },
    onSubmit: (values) => {
      axios
        .post("/api/haiku/submit", {
          line_1: values.line_1,
          line_2: values.line_2,
          line_3: values.line_3,
        })
        .then((response) => {
          if (
            response.data[1]
              .map((line, i) => checkSyllables(line, syllables[i]))
              .every((x) => x === true)
          ) {
            setNewLines({
              new_line_1: response.data[0][0].join(" "),
              new_line_2: response.data[0][1].join(" "),
              new_line_3: response.data[0][2].join(" "),
            });
          } else {
            setNewLines({
              new_line_1: "Incorrect number of syllables.",
            });
          }
        })
        .catch((error) => {});
    },
  });
  return (
    <div>
      <Head>
        <title>Parallel Haiku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="haiku-container">
          <form onSubmit={formik.handleSubmit}>
            <input
              autoFocus
              id="line_1"
              name="line_1"
              type="text"
              onChange={formik.handleChange}
              onKeyUp={(e) => handleKeyUp(e)}
              value={formik.values.line_1}
            />
            <input
              id="line_2"
              name="line_2"
              type="text"
              onChange={formik.handleChange}
              onKeyUp={(e) => handleKeyUp(e)}
              value={formik.values.line_2}
            />
            <input
              id="line_3"
              name="line_3"
              type="text"
              onChange={formik.handleChange}
              onKeyUp={(e) => handleKeyUp(e)}
              value={formik.values.line_3}
            />
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="new-haiku">
          <span>{newLines.new_line_1}</span>
          <span>{newLines.new_line_2}</span>
          <span>{newLines.new_line_3}</span>
        </div>
      </main>
      <style jsx>{`
        .haiku-container {
          width: 40vw;
        }
        input[type="text"] {
          width: 100%;
          display: block;
          background-color: inherit;
          border: none;
          outline: none;
          border-bottom: 1px solid var(--dark);
          color: var(--light);
          font-size: 1.5rem;
          padding: 1rem 1rem 0 1rem;
        }
        input[type="text"]:focus {
          border-bottom: 2px solid var(--light);
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

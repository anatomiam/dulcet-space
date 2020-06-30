import React, { Component, useState } from "react";

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
    console.log(event.target);
    axios
      .post("/api/haiku/syllable_count", {
        line: event.target.value,
        name: event.target.name,
      })
      .then((response) => {
        console.log(response.data);
        setNewLines({
          ...newLines,
          ...{
            ["new_" + response.data.name]: response.data.syllables,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Line1</label>
        <input
          id="line_1"
          name="line_1"
          type="text"
          onChange={formik.handleChange}
          // onChange={this.handleChange}
          onKeyUp={(e) => handleKeyUp(e)}
          value={formik.values.line_1}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="line_2"
          name="line_2"
          type="text"
          onChange={formik.handleChange}
          onKeyUp={(e) => handleKeyUp(e)}
          value={formik.values.line_2}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="line_3"
          name="line_3"
          type="text"
          onChange={formik.handleChange}
          onKeyUp={(e) => handleKeyUp(e)}
          value={formik.values.line_3}
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        {newLines.new_line_1}
        <br />
        {newLines.new_line_2}
        <br />
        {newLines.new_line_3}
      </p>
    </div>
  );
};

export default Input;

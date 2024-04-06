import React, { useState } from "react";

import Head from "next/head";

const minBpm = 80;
const maxBpm = 180;
const keys = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// the name of the mode and the step sequence for that mode
const modes = {
  Ionian: [0, 2, 4, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
  Lydian: [0, 2, 4, 6, 7, 9, 11],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  Aeolian: [0, 2, 3, 5, 7, 8, 10],
  Locrian: [0, 1, 3, 5, 6, 8, 10],
};

const generateRandomSongStarter = () => {
  // a random integer between 0 and modes.length
  const modeIndex = Math.floor(Math.random() * Object.keys(modes).length);

  const mode = Object.keys(modes)[modeIndex];
  const modeSteps = Object.values(modes)[modeIndex];

  // a random integer between 0 and keys.length
  const keyIndex = Math.floor(Math.random() * keys.length);
  const key = keys[keyIndex];

  // moves the randomly selected key to index 0
  const rearrangedKeys = [...keys.slice(keyIndex), ...keys.slice(0, keyIndex)];

  // generates the array of notes for the key/mode
  const notes = modeSteps.reduce((prev, curr) => {
    return [...prev, rearrangedKeys[curr]];
  }, []);

  return {
    key,
    mode: mode,
    bpm: Math.floor(Math.random() * (maxBpm - minBpm + 1) + minBpm),
    notes,
  };
};

const generateGuitarString = (note) => {
  const startingIndex = keys.findIndex((key) => key === note);
  // moves the randomly selected key to index 0
  const rearrangedNotes = [
    ...keys.slice(startingIndex),
    ...keys.slice(0, startingIndex),
  ];

  return rearrangedNotes;
};

const fretboard = [
  generateGuitarString("E"),
  generateGuitarString("B"),
  generateGuitarString("G"),
  generateGuitarString("D"),
  generateGuitarString("A"),
  generateGuitarString("E"),
];

const Note = ({ note, songKey, index }) => {
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "75px",
        height: "30px",
        border: "1px solid lightgray",
        borderRightWidth: index === 0 ? "5px" : undefined,
        color: songKey === note ? "rgb(255, 87, 51)" : "white",
      }}
    >
      {note ? note : "-"}
    </span>
  );
};

const SongStarter = () => {
  const [songStarter, setSong] = useState({
    key: "C",
    mode: "Ionian",
    bpm: 80,
    notes: ["C", "D", "E", "F", "G", "A", "B"],
  });
  const { key, mode, bpm, notes } = songStarter;

  return (
    <div>
      <Head>
        <title>Song Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="text">Key: {key}</div>
        <div className="text">Mode: {mode}</div>
        <div className="text">BPM: {bpm}</div>
        <div className="text">Notes: {notes.join(" ")}</div>
        <button
          style={{ padding: "7px", marginTop: "10px" }}
          onClick={() => {
            setSong(generateRandomSongStarter());
          }}
        >
          Generate
        </button>
        <div style={{ marginTop: "50px" }}>
          {fretboard.map((guitarString) => {
            return (
              // TODO don't use random keys
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={Math.random()}
              >
                {guitarString.map((note, index) => {
                  if (notes.includes(note)) {
                    return (
                      <Note
                        key={Math.random()}
                        note={note}
                        songKey={key}
                        index={index}
                      />
                    );
                  } else {
                    return (
                      <Note key={Math.random()} songKey={key} index={index} />
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </main>
      <style jsx>{`
        .text {
          color: var(--medium);
        }
      `}</style>
    </div>
  );
};

export default SongStarter;

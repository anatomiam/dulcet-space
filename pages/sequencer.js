import * as Tone from "tone";

import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";

const Steps = ({ row, rowIndex }) => {
  const [info, setters] = useContext(SeqContext);
  return (
    <span className="step-container">
      {row.map((currentStep) => {
        return (
          <div
            className={`step ${
              info.stepTime.step === currentStep.step ? "current" : null
            } ${currentStep.selected ? "selected" : null}`}
            onClick={() => {
              setters.updateNote({
                stepnum: currentStep.step,
                rowIndex,
              });
              setters.updatePlayNotes({
                stepnum: currentStep.step,
                rowIndex,
              });
            }}
            key={currentStep.id}
          >
            {/* {currentStep.id} */}
          </div>
        );
      })}
      <style jsx>{`
        .step-container {
          display: flex;
          flex-direction: row;
        }
        .step {
          height: 20px;
          width: 20px;
          border: 1px solid var(--light);
          color: var(--light);
        }
        .current {
          border: 2px solid red;
        }
        .selected {
          border: 2px solid orange;
          background-color: orange;
        }

        .current.selected {
          transform: scale(1.25);
        }
      `}</style>
    </span>
  );
};

const Rows = () => {
  const [info] = useContext(SeqContext);

  return (
    <div className="row-container">
      {info.matrix.map((row, rowIndex) => {
        return (
          <span className="row" key={`row-${rowIndex}`}>
            <Steps row={row} rowIndex={rowIndex} />
          </span>
        );
      })}
      <style jsx>{`
        .row-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

const SeqContext = React.createContext();
const SeqProvider = ({ children }) => {
  const [stepTime, setStepTime] = useState({
    step: -1,
    time: null,
    played: false,
  });
  const [synth, setSynth] = useState();
  const [notes, setNotes] = useState({});
  const [playNotes, setPlayNotes] = useState({});
  const [matrix, setMatrix] = useState([]);

  const updateNote = ({ stepnum, rowIndex }) => {
    const newM = matrix.slice();
    newM[rowIndex][stepnum].selected = !newM[rowIndex][stepnum].selected;
    setMatrix(newM);
  };

  const updatePlayNotes = ({ stepnum, rowIndex }) => {
    const newP = { ...playNotes };

    if (matrix[rowIndex][stepnum].selected) {
      newP[stepnum] = new Set([
        ...newP[stepnum],
        matrix[rowIndex][stepnum].note,
      ]);
    } else if (
      !matrix[rowIndex][stepnum].selected &&
      newP[stepnum].has(matrix[rowIndex][stepnum].note)
    ) {
      newP[stepnum].delete(matrix[rowIndex][stepnum].note);
    }

    setPlayNotes(newP);
  };

  // Create the matrix
  useEffect(() => {
    // const notesarr = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    const notesarr = [
      "F#4",
      "G#4",
      "A4",
      "B4",
      "C#4",
      "D#4",
      "E4",
      "F#5",
      "G#5",
      "A5",
      "B5",
      "C#5",
      "D#5",
      "E5",
      "F#6",
    ];
    const stepsnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const matrixArr = notesarr.map((note) => {
      return stepsnum.map((step) => {
        return { note, step, selected: false, id: `${note}-${step}` };
      });
    });
    setMatrix(matrixArr);
    const playNotesDict = {};
    stepsnum.forEach((step) => {
      playNotesDict[step] = [];
    });
    setPlayNotes(playNotesDict);
  }, []);

  // Set up synth and transport loop
  useEffect(() => {
    setSynth(
      new Tone.PolySynth(Tone.Synth, { maxPolyphony: 4 }).toDestination()
    );
    let x = 0;
    Tone.Transport.scheduleRepeat((time) => {
      setStepTime({ step: x, time, played: false });
      x = (x + 1) % 16;
    }, "8n");
  }, []);

  // play notes
  useEffect(() => {
    const notess = playNotes[stepTime.step]
      ? Array.from(playNotes[stepTime.step])
      : [];

    if (synth && notess.length && !stepTime.played) {
      synth.triggerAttackRelease(notess, "8n", stepTime.time);
      setStepTime({ ...stepTime, played: true });
    }
  }, [synth, playNotes, stepTime.step, stepTime.time, stepTime]);

  const info = { stepTime, synth, notes, matrix };
  const setters = { setNotes, updateNote, updatePlayNotes };

  const value = [info, setters];

  return <SeqContext.Provider value={value}>{children}</SeqContext.Provider>;
};

const Sequencer = () => {
  const [started, setStarted] = useState(false);

  Tone.Transport.bpm.value = 180;

  return (
    <div>
      <h1
        className="title"
        onClick={() => {
          if (!started && Tone.context.state !== "running") {
            Tone.context.resume();
          }
          setStarted(!started);
          if (!started) {
            Tone.Transport.start();
          } else if (started) {
            Tone.Transport.stop();
          }
        }}
      >
        {started ? "Started" : "Stopped"}
      </h1>
      <Rows />
      <style jsx>{`
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--light);
        }
      `}</style>
    </div>
  );
};

const Wrappa = () => {
  const windowLoaded = typeof window !== "undefined";
  return (
    <div>
      <Head>
        <title>Sampler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {windowLoaded ? (
          <SeqProvider>
            <Sequencer />
          </SeqProvider>
        ) : (
          <h1 className="loading">LOADING</h1>
        )}
      </main>
      <style jsx>{`
        .loading {
          margin: 0;
          line-height: 1.15;
          color: var(--light);
        }
      `}</style>
    </div>
  );
};
export default Wrappa;

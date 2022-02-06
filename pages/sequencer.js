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
              info.step === currentStep.step ? "current" : null
            } ${currentStep.selected ? "selected" : null}`}
            onClick={() => {
              setters.updateNote({
                stepnum: currentStep.step,
                rowIndex,
              });
            }}
            key={currentStep.id}
          >
            {currentStep.id}
          </div>
        );
      })}
      <style jsx>{`
        .step-container {
          display: flex;
          flex-direction: row;
        }
        .step {
          height: 35px;
          width: 35px;
          margin: 10px;
          border: 2px solid var(--light);
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
  const [step, setStep] = useState(-1);
  const [synth, setSynth] = useState();
  const [time, setTime] = useState();
  const [notes, setNotes] = useState([]);
  const [playNotes, setPlayNotes] = useState(false);
  const [matrix, setMatrix] = useState([]);

  const updateNote = ({ stepnum, rowIndex }) => {
    const newM = matrix.slice();
    newM[rowIndex][stepnum].selected = !newM[rowIndex][stepnum].selected;
    setMatrix(newM);
  };

  // Create the matrix
  useEffect(() => {
    const notesarr = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    const stepsnum = [0, 1, 2, 3, 4, 5, 6, 7];
    const matrixArr = notesarr.map((note) => {
      return stepsnum.map((step) => {
        return { note, step, selected: false, id: `${note}-${step}` };
      });
    });
    setMatrix(matrixArr);
  }, []);

  // Set up synth and transport loop
  useEffect(() => {
    setSynth(
      new Tone.PolySynth(Tone.Synth, { maxPolyphony: 8 }).toDestination()
    );
    let x = 0;
    Tone.Transport.scheduleRepeat((time) => {
      // use the callback time to schedule events
      setStep(x);
      setTime(time);
      x = (x + 1) % 8;
    }, "8n");
  }, []);

  // set notes to play
  useEffect(() => {
    if (step >= 0) {
      console.log("setting notes");
      const notess = matrix.map((row) => {
        if (row[step].selected) {
          return row[step].note;
        }
      });
      setNotes(notess.filter(Boolean));
      setPlayNotes(true);
    }
  }, [step]);

  // play notes
  useEffect(() => {
    if (synth && notes.length && playNotes) {
      console.log({ notes });
      synth.triggerAttackRelease(notes, "4n", time);
      setNotes([]);
    }
  }, [playNotes, notes, synth, time]);

  const info = { step, synth, time, notes, matrix };
  const setters = { setStep, setNotes, updateNote };

  const value = [info, setters];

  return <SeqContext.Provider value={value}>{children}</SeqContext.Provider>;
};

const Sequencer = () => {
  const [started, setStarted] = useState(false);

  Tone.Transport.bpm.value = 120;

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
          <div className="loading">LOADING</div>
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

import * as Tone from "tone";

import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";

const Steps = ({ row, rowIndex }) => {
  const rowex = [
    {
      note: "C4",
      step: 0,
      selected: false,
      id: "C4-0",
    },
    {
      note: "C4",
      step: 1,
      selected: false,
      id: "C4-1",
    },
    {
      note: "C4",
      step: 2,
      selected: false,
      id: "C4-2",
    },
    {
      note: "C4",
      step: 3,
      selected: false,
      id: "C4-3",
    },
    {
      note: "C4",
      step: 4,
      selected: false,
      id: "C4-4",
    },
    {
      note: "C4",
      step: 5,
      selected: false,
      id: "C4-5",
    },
    {
      note: "C4",
      step: 6,
      selected: false,
      id: "C4-6",
    },
    {
      note: "C4",
      step: 7,
      selected: false,
      id: "C4-7",
    },
  ];

  return (
    <span className="step-container">
      {row.map((currentStep) => {
        const [selected, setSelected] = useState(false);
        const [info, setters] = useContext(SeqContext);
        const synth = info.synth;
        useEffect(() => {
          if (info.step === currentStep.step && currentStep.selected) {
            // synth.triggerAttackRelease(note, "4n", info.time);
            setters.setNotes([...info.notes, currentStep.note]);
          }
        }, [currentStep.step, currentStep.selected]);
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
        @media (max-width: 600px) {
        }
      `}</style>
    </span>
  );
};

const Notes = () => {
  // const notesarr = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  // const stepsnum = [0, 1, 2, 3, 4, 5, 6, 7];

  // const matrix = notesarr.map((note) => {
  //   return stepsnum.map((step) => {
  //     return { note, step, selected: false, id: `${note}-${step}` };
  //   });
  // });
  const [info, setters] = useContext(SeqContext);

  return (
    <div className="note-container">
      {info.matrix.map((row, rowIndex) => {
        return (
          <span className="note-row" key={`note-row-${rowIndex}`}>
            <Steps row={row} rowIndex={rowIndex} />
          </span>
        );
      })}
      <style jsx>{`
        .note-row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .note-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (max-width: 600px) {
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
  }, [playNotes, notes]);

  const info = { step, synth, time, notes, matrix };
  const setters = { setStep, setNotes, updateNote };

  const value = [info, setters];

  return <SeqContext.Provider value={value}>{children}</SeqContext.Provider>;
};

const Sequencer = () => {
  const [info, setStep] = useContext(SeqContext);
  Tone.Transport.bpm.value = 120;

  const [started, setStarted] = useState(false);
  // const [time, setTime] = useState();
  // const [step, setStep] = useState(0);

  useEffect(() => {
    // let x = 0;
    // Tone.Transport.scheduleRepeat((time) => {
    //   // use the callback time to schedule events
    //   setStep(x);
    //   setTime(time);
    //   x = (x + 1) % 8;
    // }, "8n");
  }, []);

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
      <Notes step={info.step} />
      <style jsx>{`
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: var(--text-extra-large);
          color: var(--light);
        }
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

const Wrappa = () => {
  const windowLoaded = typeof window !== "undefined";
  if (windowLoaded) {
    return (
      <div className="container">
        <Head>
          <title>Sampler</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <SeqProvider>
            <Sequencer />
          </SeqProvider>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Sampler</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="loading">LOADING</div>;
        </main>
        <style jsx>{`
          .loading {
            margin: 0;
            line-height: 1.15;
            color: var(--light);
          }
          @media (max-width: 600px) {
          }
        `}</style>
      </div>
    );
  }
};
export default Wrappa;

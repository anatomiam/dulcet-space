import * as Tone from "tone";

import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";

const Steps = ({ step, note }) => {
  const steps = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <span className="step-container">
      {steps.map((currentStep) => {
        const [selected, setSelected] = useState(false);
        const [info, setStep] = useContext(SeqContext);
        const synth = info.synth;
        useEffect(() => {
          if (step === currentStep && selected) {
            synth.triggerAttackRelease(note, "4n", info.time);
          }
        }, [step, selected]);
        return (
          <div
            className={`step ${step === currentStep ? "current" : null} ${
              selected ? "selected" : null
            }`}
            onClick={() => {
              setSelected(!selected);
            }}
            key={currentStep}
          ></div>
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

const Notes = ({ step }) => {
  const notes = [
    { id: 0, note: "C4" },
    { id: 1, note: "D4" },
    { id: 2, note: "E4" },
    { id: 3, note: "F4" },
    { id: 4, note: "G4" },
    { id: 5, note: "A4" },
    { id: 6, note: "B4" },
    { id: 7, note: "C5" },
  ];

  return (
    <div className="note-container">
      {notes.map((note) => {
        return (
          <span className="note-row" key={note.id}>
            <span id={note.id} className="note" data-note={note.note}>
              {note.note}
            </span>
            <Steps step={step} note={note.note} />
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
        .note {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 45px;
          width: 45px;
          margin: 5px;
          border-radius: 50%;
          border: 2px solid var(--light);
          color: var(--light);
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

  const info = { step, synth, time };

  const value = [info, setStep];

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
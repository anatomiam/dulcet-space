import * as Tone from "tone";

import React, { useContext, useEffect, useState } from "react";

import Head from "next/head";

/**
 *
 * TODO figure out what state values can be stored in component state vs global to prevent unnecessary renders
 * All Tone/Synth functions should be made in the provider though
 *
 *
 * TODO could I set up a sequence for each note? would they stay in sync?
 * OR use modulus on each step
 *
 */

const SeqContext = React.createContext();

const key = {
  cMajor: [
    "C5",
    "B4",
    "A4",
    "G4",
    "F4",
    "E4",
    "D4",
    "C4",
    "B3",
    "A3",
    "G3",
    "F3",
    "E3",
    "D3",
    "C3",
    "B2",
  ],
  gSharpDorian: [
    "G#5",
    "F#5",
    "E5",
    "D#5",
    "C#5",
    "B4",
    "A4",
    "G#4",
    "F#4",
    "E4",
    "D#4",
    "C#4",
    "B3",
    "A3",
    "G#3",
    "F#3",
  ],
  pentatonic: [
    "A6",
    "G6",
    "F6",
    "D6",
    "B#5",
    "A5",
    "G5",
    "F5",
    "D5",
    "B#4",
    "A4",
    "G4",
    "F4",
    "D4",
    "B#3",
    "A3",
  ],
};

const SeqProvider = ({ children }) => {
  const [stepTime, setStepTime] = useState({
    step: -1,
    time: null,
    played: false,
  });
  const [synth, setSynth] = useState(null);
  const [BPM, setBPM] = useState(180);
  const [notes, setNotes] = useState({});
  const [playNotes, setPlayNotes] = useState({});
  const [matrix, setMatrix] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [matrixNotes, setMatrixNotes] = useState(key.cMajor);
  const [started, setStarted] = useState(false);

  const updateNote = ({ stepnum, rowIndex }) => {
    const newM = matrix.slice();
    newM[rowIndex][stepnum].selected = !newM[rowIndex][stepnum].selected;
    setMatrix(newM);
  };

  const startTransport = () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    setStarted(true);
    Tone.Transport.start();
  };

  const stopTransport = () => {
    setStarted(false);
    Tone.Transport.stop();
  };

  const clearSequence = (id) => {
    Tone.Transport.clear(id);
  };

  const updateBPM = (newBPM) => {
    Tone.Transport.bpm.value = newBPM;
    setBPM(newBPM);
  };

  const updateSynthVolume = (volume) => {
    synth.volume.value = volume;
  };

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const updatePlayNotes = ({ stepnum, rowIndex }) => {
    const newP = { ...playNotes };

    if (matrix[rowIndex][stepnum].selected) {
      // if note is selected, add it to the set of notes to be played for that step
      newP[stepnum] = new Set([
        ...newP[stepnum],
        matrix[rowIndex][stepnum].note,
      ]);
    } else if (
      // if note is note selected and note is already in set to play, remove it from set
      !matrix[rowIndex][stepnum].selected &&
      newP[stepnum].has(matrix[rowIndex][stepnum].note)
    ) {
      newP[stepnum].delete(matrix[rowIndex][stepnum].note);
    }

    setPlayNotes(newP);
  };

  // Create the matrix
  const initializeMatrix = (notesarr) => {
    const stepsnum = [...Array(notesarr.length).keys()];

    // creates 2d array, each entry holds it's own state, e.g. note, selected
    const matrixArr = notesarr.map((note) => {
      return stepsnum.map((step) => {
        return { note, step, selected: false, id: `${note}-${step}` };
      });
    });
    setMatrix(matrixArr);

    // sets up a dict that will contain an array of notes to play for each step
    const playNotesDict = {};
    stepsnum.forEach((step) => {
      playNotesDict[step] = [];
    });
    setPlayNotes(playNotesDict);

    return notesarr.length;
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Set up synth and transport loop and initialize matrix
  useEffect(() => {
    stopTransport();
    setStepTime({
      step: -1,
      time: null,
      played: false,
    });
    setSynth(
      new Tone.PolySynth(Tone.Synth, { maxPolyphony: 4 }).toDestination()
    );
    updateBPM(180);

    const sequencelength = initializeMatrix(matrixNotes);

    // this is the looper
    let x = 0;
    const sequence = Tone.Transport.scheduleRepeat((time) => {
      setStepTime({ step: x, time, played: false });
      x = (x + 1) % sequencelength;
    }, "8n");

    return () => {
      if (sequence !== undefined) {
        clearSequence(sequence);
      }
    };
  }, [matrixNotes]);

  // play notes
  useEffect(() => {
    const notess = playNotes[stepTime.step]
      ? Array.from(playNotes[stepTime.step])
      : [];

    if (synth && notess.length && !stepTime.played) {
      synth.triggerAttackRelease(notess, "8n", stepTime.time);
      // setting played = true here prevents extra notes getting triggered when selecting while playing
      setStepTime({ ...stepTime, played: true });
    }
  }, [synth, playNotes, stepTime.step, stepTime.time, stepTime]);

  const info = {
    stepTime,
    notes,
    matrix,
    mouseDown,
    BPM,
    matrixNotes,
    started,
  };
  const setters = {
    setNotes,
    updateNote,
    updatePlayNotes,
    setMouseDown,
    initializeMatrix,
    updateBPM,
    setMatrixNotes,
    startTransport,
    stopTransport,
    updateSynthVolume,
  };

  const value = [info, setters];

  return <SeqContext.Provider value={value}>{children}</SeqContext.Provider>;
};

const Sequencer = () => {
  return (
    <div>
      <h1 className="title">Sequence</h1>
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

const Steps = ({ row, rowIndex }) => {
  const [info, setters] = useContext(SeqContext);
  return (
    <span className="step-container">
      {row.map((currentStep) => {
        const stepClasses = `step ${
          info.stepTime.step === currentStep.step ? "current" : null
        } ${currentStep.selected ? "selected" : null}`;

        return (
          <div
            className={stepClasses}
            onMouseDown={() => {
              setters.updateNote({
                stepnum: currentStep.step,
                rowIndex,
              });
              setters.updatePlayNotes({
                stepnum: currentStep.step,
                rowIndex,
              });
            }}
            onMouseEnter={(e) => {
              if (info.mouseDown) {
                setters.updateNote({
                  stepnum: currentStep.step,
                  rowIndex,
                });
                setters.updatePlayNotes({
                  stepnum: currentStep.step,
                  rowIndex,
                });
              }
            }}
            key={currentStep.id}
          >
            {/* {currentStep.note} */}
          </div>
        );
      })}
      <style jsx>{`
        .step-container {
          display: flex;
          flex-direction: row;
        }
        .step {
          cursor: pointer;
          height: 25px;
          width: 25px;
          border: 1px solid var(--light);
          color: var(--light);
        }
        .step:hover {
          border: 3px solid var(--light);
          transform: scale(1.25);
        }
        .current {
          border: 2px solid red;
        }
        .selected {
          border: 1px solid #f45f00;
          background-color: #f45f00;
        }
        .current.selected {
          transform: scale(1.25);
        }
      `}</style>
    </span>
  );
};

const Controls = () => {
  const [info, setters] = useContext(SeqContext);
  const keyKeys = Object.keys(key);
  const [synthVolume, setSynthVolume] = useState(-5);
  return (
    <div>
      <div className="title">CONTROLS</div>
      <div>
        <button
          onClick={() => {
            if (!info.started) {
              setters.startTransport();
            } else if (info.started) {
              setters.stopTransport();
            }
          }}
        >
          {info.started ? "Stop" : "Start"}
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setters.initializeMatrix(info.matrixNotes);
          }}
        >
          Reset Notes
        </button>
      </div>

      <div>
        <label htmlFor="key-select">
          Key:
          <select
            name="key-select"
            value={info.matrixNotes.name}
            onChange={(e) => {
              setters.setMatrixNotes(key[e.target.value]);
            }}
          >
            {keyKeys.map((keyy) => (
              <option value={keyy} key={keyy}>
                {keyy}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="bpm">BPM: </label>
        <input
          type="number"
          name="bpm"
          value={info.BPM}
          onChange={(e) => {
            setters.updateBPM(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="volume-slider">Volume: </label>
        <input
          type="range"
          min="-20"
          max="20"
          value={synthVolume}
          onChange={(e) => {
            setters.updateSynthVolume(e.target.value);
            setSynthVolume(e.target.value);
          }}
        />
      </div>
      <style jsx>{`
        .title {
          color: var(--light);
        }
        label {
          color: var(--light);
        }
      `}</style>
    </div>
  );
};

const Main = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaded(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Sampler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {loaded ? (
          <SeqProvider>
            <Sequencer />
            <Controls />
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
export default Main;

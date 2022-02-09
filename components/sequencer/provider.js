import * as Tone from "tone";

import React, { useEffect, useState } from "react";

import { key } from "./constants";

export const SeqContext = React.createContext();

export const SeqProvider = ({ children }) => {
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

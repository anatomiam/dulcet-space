import * as Tone from "tone";

import React, { useEffect, useReducer, useState } from "react";
import { init, reducer } from "./reducer";

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
  const [mouseDown, setMouseDown] = useState(false);
  const [matrixNotes, setMatrixNotes] = useState(key.cMajor);
  const [started, setStarted] = useState(false);

  const [state, dispatch] = useReducer(reducer, matrixNotes, init);
  const { matrix, playNotes } = state;

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

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Set up synth and transport loop
  useEffect(() => {
    stopTransport();
    setStepTime({
      step: -1,
      time: null,
      played: false,
    });
    // TODO why isn't maxPolyphony working
    setSynth(
      new Tone.PolySynth(Tone.Synth, { maxPolyphony: 4 }).toDestination()
    );
    updateBPM(180);

    // this is the looper
    let x = 0;
    const sequence = Tone.Transport.scheduleRepeat((time) => {
      setStepTime({ step: x, time, played: false });
      x = (x + 1) % matrixNotes.length;
    }, "8n");

    return () => {
      if (sequence !== undefined) {
        clearSequence(sequence);
      }
    };
  }, [matrixNotes]);

  // play notes
  useEffect(() => {
    const playNotesArray = playNotes[stepTime.step]
      ? Array.from(playNotes[stepTime.step])
      : [];

    if (synth && playNotesArray.length && !stepTime.played) {
      synth.triggerAttackRelease(playNotesArray, "8n", stepTime.time);
      // setting played = true here prevents extra notes getting triggered when selecting while playing
      setStepTime({ ...stepTime, played: true });
    }
  }, [synth, playNotes, stepTime.step, stepTime.time, stepTime]);

  const info = {
    stepTime,
    matrix,
    mouseDown,
    BPM,
    matrixNotes,
    started,
  };
  const func = {
    updateBPM,
    setMatrixNotes,
    startTransport,
    stopTransport,
    updateSynthVolume,
  };

  const value = [info, func, dispatch];

  return <SeqContext.Provider value={value}>{children}</SeqContext.Provider>;
};

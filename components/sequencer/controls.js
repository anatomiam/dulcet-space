import React, { useContext, useState } from "react";

import { SeqContext } from "./provider";
import { key } from "./constants";

export const Controls = () => {
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

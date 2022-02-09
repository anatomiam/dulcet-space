import React, { useContext, useState } from "react";

import { SeqContext } from "./provider";
import { key } from "./constants";
import { setters } from "pos/lexicon";

export const Controls = () => {
  const [info, func, dispatch] = useContext(SeqContext);
  const keyNames = Object.keys(key);
  const [synthVolume, setSynthVolume] = useState(-5);
  return (
    <div>
      <div className="title">CONTROLS</div>
      <div>
        <button
          onClick={() => {
            if (!info.started) {
              func.startTransport();
            } else if (info.started) {
              func.stopTransport();
            }
          }}
        >
          {info.started ? "Stop" : "Start"}
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "INITIALIZE", payload: info.matrixNotes });
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
              // triggers useEffect that resets the looper
              func.setMatrixNotes(key[e.target.value]);
              dispatch({ type: "INITIALIZE", payload: key[e.target.value] });
            }}
          >
            {keyNames.map((keyName) => (
              <option value={keyName} key={keyName}>
                {keyName}
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
            func.updateBPM(e.target.value);
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
            func.updateSynthVolume(e.target.value);
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

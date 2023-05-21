import React, { useContext, useState } from "react";

import { SeqContext } from "./provider";
import { key } from "./constants";
import { FaPlay, FaPause, FaPlus, FaMinus } from "react-icons/fa";
import { GrRedo } from "react-icons/gr";

export const Controls = () => {
  const [info, func, dispatch] = useContext(SeqContext);
  const keyNames = Object.keys(key);
  const [synthVolume, setSynthVolume] = useState(-5);
  return (
    <div>
      <div className="actions">
        <span
          className="icon"
          onClick={() => {
            if (!info.started) {
              func.startTransport();
            } else if (info.started) {
              func.stopTransport();
            }
          }}
        >
          {info.started ? <FaPause /> : <FaPlay />}
        </span>
        <span className="tempo-controls">
          <FaMinus
            onClick={() => {
              func.updateBPM(Number(info.BPM) - 1);
            }}
          />
          <input
            className="tempo"
            type="number"
            value={info.BPM}
            onChange={(e) => {
              func.updateBPM(e.target.value);
            }}
          />
          <FaPlus
            onClick={() => {
              func.updateBPM(Number(info.BPM) + 1);
            }}
          />
        </span>
        <span className="icon">
          <GrRedo
            style={{ transform: "rotate(180deg)" }}
            onClick={() => {
              dispatch({ type: "INITIALIZE", payload: info.matrixNotes });
            }}
          />
        </span>
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
        .icon {
          display: flex;
          align-items: center;
          line-height: 1.5;
          font-size: var(--text-large);
          color: var(--light);
        }
        .redo {
          transform: rotate(90deg);
        }
        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
        }
        .tempo-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
        }
        .tempo {
          color: var(--light);
          background-color: black;
          border: none;
          text-align: center;
          width: 50px;
          font-size: var(--text-medium);
          font-weight: bold;
          font-family: monospace;
        }
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        label {
          color: var(--light);
        }
      `}</style>
    </div>
  );
};

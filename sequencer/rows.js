import React, { useContext } from "react";

import { SeqContext } from "./provider";
import { Steps } from "./steps";

export const Rows = () => {
  const [info] = useContext(SeqContext);

  return (
    <div className="row-container">
      {info.matrix.map((row, rowIndex) => {
        return (
          <span className="row" key={`row-${rowIndex}`}>
            <span className="note-label">{row[0].note}</span>
            <Steps row={row} rowIndex={rowIndex} />
          </span>
        );
      })}
      <span className="row footer-row">
        <span className="note-label"></span>
        <span className="step-container">
          {[...Array(16).keys()].map((step) => (
            <div key={`footer-${step}`} className="step-number">
              {step + 1}
            </div>
          ))}
        </span>
      </span>
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
        .footer-row {
        }
        .note-label {
          color: var(--medium);
          font-size: var(--text-very-small);
          width: 40px;
          text-align: right;
          padding-right: 10px;
        }
        .step-container {
          display: flex;
          flex-direction: row;
        }
        .step-number {
          width: 20px;
          height: 20px;
          margin: 3px;
          color: var(--medium);
          font-size: var(--text-very-small);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
        }
        @media (max-width: 768px) {
          .step-number {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

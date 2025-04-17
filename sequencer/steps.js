import React, { useContext } from "react";

import { SeqContext } from "./provider";

export const Steps = ({ row, rowIndex }) => {
  const [info, func, dispatch] = useContext(SeqContext);
  return (
    <span className="step-container">
      {row.map((currentStep) => {
        const isDownbeat = [0, 4, 8, 12].includes(currentStep.step);
        const stepClasses = `step ${
          info.stepTime.step === currentStep.step ? "current" : null
        } ${currentStep.selected ? "selected" : null} ${
          isDownbeat ? "downbeat" : null
        }`;

        return (
          <div
            className={stepClasses}
            key={currentStep.id}
            onMouseDown={() => {
              dispatch({
                type: "UPDATE_STEP",
                payload: {
                  stepnum: currentStep.step,
                  rowIndex,
                },
              });
              dispatch({
                type: "UPDATE_NOTE",
                payload: {
                  stepnum: currentStep.step,
                  rowIndex,
                },
              });
            }}
            onMouseEnter={() => {
              if (info.mouseDown) {
                dispatch({
                  type: "UPDATE_STEP",
                  payload: {
                    stepnum: currentStep.step,
                    rowIndex,
                  },
                });
                dispatch({
                  type: "UPDATE_NOTE",
                  payload: {
                    stepnum: currentStep.step,
                    rowIndex,
                  },
                });
              }
            }}
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
          height: 20px;
          width: 20px;
          margin: 3px;
          border: 1px solid var(--light);
          color: var(--light);
          font-size: var(--text-very-small);
        }
        .downbeat {
          border-width: 3px;
        }
        @media (max-width: 768px) {
          .step {
            height: 16px;
            width: 16px;
          }
        }
        .step:hover {
          transform: scale(1.3);
          border: 2px solid purple;
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

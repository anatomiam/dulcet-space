import React, { useContext } from "react";

import { SeqContext } from "./provider";

export const Steps = ({ row, rowIndex }) => {
  const [info, func, dispatch] = useContext(SeqContext);
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

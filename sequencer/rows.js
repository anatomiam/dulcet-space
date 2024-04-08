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

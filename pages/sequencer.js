import React, { useEffect, useState } from "react";

import { Controls } from "../sequencer/controls";
import Head from "next/head";
import { Rows } from "../sequencer/rows";
import { SeqProvider } from "../sequencer/provider";

/**
 *
 * TODO figure out what state values can be stored in component state vs global to prevent unnecessary renders
 *
 *
 * TODO could I set up a sequence for each note? would they stay in sync?
 * OR use modulus on each step
 *
 */

const Sequencer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaded(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Sequencer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loaded ? (
          <SeqProvider>
            <h1 className="title">Sequence</h1>
            <Rows />
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
export default Sequencer;

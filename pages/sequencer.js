import React, { useEffect, useState } from "react";

import { Controls } from "../components/sequencer/controls";
import Head from "next/head";
import { Rows } from "../components/sequencer/rows";
import { SeqProvider } from "../components/sequencer/provider";
import { motion } from "framer-motion";

/**
 *
 * TODO figure out what state values can be stored in component state vs global to prevent unnecessary renders
 *
 *
 * TODO could I set up a sequence for each note? would they stay in sync?
 * OR use modulus on each step
 *
 */

const textVariants = {
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0,
      type: "spring",
      damping: 100,
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

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
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={textVariants}
        >
          {loaded ? (
            <SeqProvider>
              <h1 className="title">Sequence</h1>
              <Rows />
              <Controls />
            </SeqProvider>
          ) : (
            <div className="loading">LOADING</div>
          )}
        </motion.div>
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

// Create the matrix
const initializeMatrix = (notesArray) => {
  const stepsArray = [...Array(notesArray.length).keys()];

  // creates 2d array, each entry holds it's own state, e.g. note, selected
  const matrixArr = notesArray.map((note) => {
    return stepsArray.map((step) => {
      return { note, step, selected: false, id: `${note}-${step}` };
    });
  });
  return matrixArr;
};

// Create the matrix
const initializePlayNotes = (sequenceLength) => {
  const stepsArray = [...Array(sequenceLength).keys()];

  // sets up a dict that will contain an array of notes to play for each step
  const playNotesDict = {};
  stepsArray.forEach((step) => {
    playNotesDict[step] = [];
  });
  return playNotesDict;
};

export const init = (initialKey) => {
  const matrix = initializeMatrix(initialKey);
  const playNotes = initializePlayNotes(initialKey.length);
  return { matrix, playNotes };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STEP": {
      const { stepnum, rowIndex } = action.payload;
      const matrixCopy = state.matrix.slice();
      matrixCopy[rowIndex][stepnum].selected =
        !matrixCopy[rowIndex][stepnum].selected;
      return { ...state, matrix: matrixCopy };
    }
    case "UPDATE_NOTE": {
      const { stepnum, rowIndex } = action.payload;
      const playNotesCopy = { ...state.playNotes };

      if (state.matrix[rowIndex][stepnum].selected) {
        // if note is selected, add it to the set of notes to be played for that step
        playNotesCopy[stepnum] = new Set([
          ...playNotesCopy[stepnum],
          state.matrix[rowIndex][stepnum].note,
        ]);
      } else if (
        // if note is note selected and note is already in set to play, remove it from set
        !state.matrix[rowIndex][stepnum].selected &&
        playNotesCopy[stepnum].has(state.matrix[rowIndex][stepnum].note)
      ) {
        playNotesCopy[stepnum].delete(state.matrix[rowIndex][stepnum].note);
      }

      return { ...state, playNotes: playNotesCopy };
    }
    case "INITIALIZE":
      return init(action.payload);
    default:
      return {};
  }
};

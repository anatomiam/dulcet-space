const pr = require("../../../utility/haiku_parser");
const pronouncing = require("pronouncing");
const pos = require("pos");
const _ = require("lodash");
const data = require("./pos_words");

let tagger = new pos.Tagger();

const submit = (req, res) => {
  if (req.method === "POST") {
    const haiku = [req.body.line_1, req.body.line_2, req.body.line_3];

    const cleanHaiku = pr.runHaikuThrough(pr.cleanLine, haiku);

    const soundsHaiku = pr.runHaikuThrough(pr.sounds, cleanHaiku);

    const numSyllablesHaiku = pr.runHaikuThrough(
      pronouncing.syllableCount,
      soundsHaiku
    );

    const stressHaiku = pr.runHaikuThrough(pr.stresses, soundsHaiku);

    const newLineHaiku = pr.runHaikuThrough(pr.sameStress, stressHaiku);

    const newRhymeHaiku = pr.runHaikuThrough(pr.sameRhymes, cleanHaiku);

    const stressAndRhymeLists = pr.runHaikuThrough(
      pr.intersectTwoLines,
      newLineHaiku,
      newRhymeHaiku
    );

    // finalHaiku = pr.runHaikuThrough(pr.removeUndefined, cleanHaiku, stressAndRhymeHaiku);

    let tagged = cleanHaiku.map((line) => {
      return tagger.tag(line);
    });

    let taggedIntersection = tagged.map((line, t) => {
      return line.map((pos, i) => {
        switch (pos[1]) {
          case "N":
          case "NN":
          case "NNS":
          case "NNP":
          case "NNPS":
          case "WP":
          case "WP$":
            let text1 =
              data[
                `${pronouncing.syllableCount(
                  pronouncing.phonesForWord(pos[0][0])
                )}noun`
              ];
            return _.intersection(stressAndRhymeLists[t][i], text1);
          case "JJ":
          case "JJR":
          case "JJS":
            let text2 =
              data[
                `${pronouncing.syllableCount(
                  pronouncing.phonesForWord(pos[0][0])
                )}adjective`
              ];
            return _.intersection(stressAndRhymeLists[t][i], text2);
          case "VB":
          case "VBD":
          case "VBG":
          case "VBN":
          case "VBP":
          case "VBZ":
            let text3 =
              data[
                `${pronouncing.syllableCount(
                  pronouncing.phonesForWord(pos[0][0])
                )}verb`
              ];
            return _.intersection(stressAndRhymeLists[t][i], text3);
          case "RB":
          case "RBR":
          case "RBS":
            let text4 =
              data[
                `${pronouncing.syllableCount(
                  pronouncing.phonesForWord(pos[0][0])
                )}adverb`
              ];
            return _.intersection(stressAndRhymeLists[t][i], text4);
          default:
        }
      });
    });

    const stressAndRhymeHaiku = pr.runHaikuThrough(
      pr.randomWord,
      stressAndRhymeLists
    );

    const stressAndRhymeHaiku2 = pr.runHaikuThrough(
      pr.removeEmpty,
      cleanHaiku,
      stressAndRhymeHaiku
    );

    const taggedIntersection2 = pr.runHaikuThrough(
      pr.randomWord,
      taggedIntersection
    );

    const almostFinalHaiku = pr.runHaikuThrough(
      pr.removeEmpty,
      stressAndRhymeHaiku2,
      taggedIntersection2
    );

    const finalHaiku = pr.runHaikuThrough(
      pr.removeUndefined,
      cleanHaiku,
      almostFinalHaiku
    );

    res.status(200).json([
      [finalHaiku[0], finalHaiku[1], finalHaiku[2]],
      [numSyllablesHaiku[0], numSyllablesHaiku[1], numSyllablesHaiku[2]],
    ]);
  }
};

export default submit;

const pr = require("../../../haiku/haiku_parser");
const pronouncing = require("pronouncing");

// catches post on keyup and returns current syllable count for the line
const syllableCount = (req, res) => {
  if (req.method === "POST") {
    const syllables = pronouncing.syllableCount(
      pr.sounds(pr.cleanLine(req.body.line))
    );
    res.status(200).json({
      syllables: syllables,
      name: req.body.name,
    });
  }
};

export default syllableCount;

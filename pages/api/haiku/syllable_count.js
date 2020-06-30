const pr = require("../../../utility/haiku_parser");
const pronouncing = require("pronouncing");

// catches post on keyup and returns current syllable count for the line
export default (req, res) => {
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

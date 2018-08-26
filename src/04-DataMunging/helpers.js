/*
Take the two programs written previously and factor out as much common 
code as possible, leaving you with two smaller programs and some kind 
of shared functionality.
*/
const defaultLineMatcher = (ln) =>
  !!ln.match(/[A-z0-9]/);

function parseLine(line, matcher) {
  return line.split(' ').filter(matcher || defaultLineMatcher);
}

function findMinSpread(data, hiValKey, loValKey) {
  return data.reduce((accum, val) => {
    const hiVal = val[hiValKey];
    const loVal = val[loValKey];
    const diff = Math.abs(hiVal - loVal);

    if (!accum || diff < accum.diff) {
      return { ...val, diff };
    }
    return accum;
  }, null);
}

module.exports = {
  findMinSpread,
  parseLine,
};

const fs = require('fs');
const readline = require('readline');

const charMap = {};

const rl = readline.createInterface({
  input: fs.createReadStream('./wordlist.txt'),
  crlfDelay: Infinity,
});

console.log('Reading file...');
console.time('Total time');
console.time('Reading file');

rl.on('line', (line) => {
  const key = line.split('').sort().join('');
  if (key in charMap) {
    charMap[key].push(line);
  } else {
    charMap[key] = [line];
  }
});

rl.on('close', () => {
  console.timeEnd('Reading file');
  console.log('Parsing results...');
  console.time('Parsing results');

  const matches = Object.values(charMap).filter(m => m.length > 1);
  const results = matches.reduce((accum, val) => ({
    sets: accum.sets + 1,
    words: accum.words + val.length,
  }), { sets: 0, words: 0 });

  console.timeEnd('Parsing results');
  console.timeEnd('Total time');
  console.log({ results });
});

const assert = require('assert');

function chopRecursive(value, arr, lo = 0, hi = arr.length - 1) {
  const len = hi - lo + 1;
  if (len <= 1) {
    return arr[lo] === value ? lo : -1;
  }

  const mid = Math.floor(len / 2);
  const offsetMid = lo + mid;
  const midValue = arr[offsetMid];

  if (midValue === value) {
    return offsetMid;
  } else if (midValue > value) {
    return chop(value, arr, lo, mid - 1);
  } else if (midValue < value) {
    return chop(value, arr, offsetMid + 1, hi);
  }

  return -1;
}

// ==============================
// = TESTS
// ==============================

const chop = chopRecursive;

assert.equal(-1, chop(3, []));
assert.equal(-1, chop(3, [1]));
assert.equal(0, chop(1, [1]));

const arr2 = [4, 5];
assert.equal(0, chop(4, arr2));
assert.equal(1, chop(5, arr2));

const arr3 = [1, 3, 5];
assert.equal(0, chop(1, arr3));
assert.equal(1, chop(3, arr3));
assert.equal(2, chop(5, arr3));
assert.equal(-1, chop(0, arr3));
assert.equal(-1, chop(2, arr3));
assert.equal(-1, chop(4, arr3));
assert.equal(-1, chop(6, arr3));

const arr4 = [1, 3, 5, 7];
assert.equal(1, chop(3, arr4));
assert.equal(2, chop(5, arr4));
assert.equal(3, chop(7, arr4));
assert.equal(-1, chop(0, arr4));
assert.equal(-1, chop(2, arr4));
assert.equal(-1, chop(4, arr4));
assert.equal(-1, chop(6, arr4));
assert.equal(-1, chop(8, arr4));

const arr9 = [1, 2, 5, 7, 9, 10, 13, 18, 41];
assert.equal(0, chop(1, arr9));
assert.equal(1, chop(2, arr9));
assert.equal(7, chop(18, arr9));
assert.equal(8, chop(41, arr9));
/*
====================================
= Binary Chop
====================================

- Implement a binary search routine.
- Tomorrow, implement it again, using a totally different technique.
- Do the same the next day, until you have five totally unique
  implementations of a binary chop.

(For example, one solution might be the traditional iterative approach,
  one might be recursive, one might use a functional style passing
  array slices around, and so on).

====================================
= Goals
====================================

1. As you’re coding each algorithm, keep a note of the kinds of
  error you encounter. A binary search is a ripe breeding ground
  for “off by one” and fencepost errors. As you progress through the
  week, see if the frequency of these errors decreases (that is, do
  you learn from experience in one technique when it comes to coding
  with a different technique?).

2. What can you say about the relative merits of the various techniques
  you’ve chosen? Which is the most likely to make it in to production code?
  Which was the most fun to write? Which was the hardest to get working?
  And for all these questions, ask yourself “why?”.

3. It’s fairly hard to come up with five unique approaches to a binary chop.
  How did you go about coming up with approaches four and five? What
  techniques did you use to fire those “off the wall” neurons?
*/
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
    return chopRecursive(value, arr, lo, mid - 1);
  } else if (midValue < value) {
    return chopRecursive(value, arr, offsetMid + 1, hi);
  }

  return -1;
}

function chopIterative(value, arr) {
  if (!arr.length) {
    return -1;
  }

  let len = arr.length;
  let lo = 0;
  let hi = len - 1;

  while (len) {
    if (len === 1) {
      return arr[lo] === value ? lo : -1;
    }

    const mid = lo + (Math.floor(len / 2));
    const val = arr[mid];

    if (val === value) {
      return mid;
    } else if (val > value) {
      hi = Math.floor((len - 1) / 2);
    } else if (val < value) {
      lo += Math.floor(len / 2);
    }

    len = hi - lo + 1;
  }
  return -1;
}

// ==============================
// = TESTS
// ==============================
const chop = chopIterative;

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

/*
==============================
= (Very) Rough Benchmarks
==============================

Rough results based on Arrays of randomized ints:

Recursive:
@ 25 elements: 0.158ms
@ 100 elements: 0.007ms
@ 1000 elements: 0.004ms
@ 10000 elements: 0.008ms
@ 50000 elements: 0.010ms

Iterative:
@ 25 elements: 0.158ms
@ 100 elements: 0.007ms
@ 1001 elements: 0.008ms
@ 10000 elements: 0.008ms
@ 50000 elements: 0.009ms
*/

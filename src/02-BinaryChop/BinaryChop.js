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

module.exports = {
  chopIterative,
  chopRecursive,
};

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

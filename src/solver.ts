import type { HistoryItem } from "./store";

export const checkSolution = (history: HistoryItem[], selected: number[]) => {
  for (const [hIdx, item] of history.entries()) {
    const historyNumber = history.length - hIdx;
    // check for stars
    let fullMatches = 0;
    for (const [idx, element] of selected.entries()) {
      if (item.elements[idx] === element) {
        fullMatches++;
      }
    }
    if (fullMatches !== item.stars) {
      return `History item №${historyNumber} has ${item.stars} star(s), but solution has ${fullMatches} match(es)`;
    }
    // check for total stars + clues
    const totalNeededMatches = item.stars + item.clues;
    // numbers can repeat, so we can't use the same index twice
    const usedIndices = new Set<number>();
    let allMatches = 0;
    for (const element of selected) {
      const itemIdx = item.elements.findIndex(
        (el, idx) => el === element && !usedIndices.has(idx)
      );
      if (itemIdx !== -1) {
        allMatches++;
        usedIndices.add(itemIdx);
      }
    }
    if (allMatches != totalNeededMatches) {
      return `History item ${historyNumber} has ${totalNeededMatches} stars + clues, but solution has ${allMatches} matches`;
    }
  }
  return null;
};

const createAllPermutations = (elements: number[], length: number) => {
  let res: number[][] = [];
  const permute = (length: number, parent: number[][]): number[][] => {
    if (length <= 1) {
      return parent;
    }
    const res: number[][] = [];
    for (const items of parent) {
      for (const el of elements) {
        res.push([...items, el]);
      }
    }

    return permute(length - 1, res);
  };
  for (const el of elements) {
    res = [...res, ...permute(length, [[el]])];
  }
  return res;
};

export const findSolutions = (
  history: HistoryItem[],
  elements: number[],
  length: number
) => {
  const permutations = createAllPermutations(elements, length);
  const viableSolutions = permutations.filter(
    (p) => !checkSolution(history, p)
  );
  return viableSolutions;
};

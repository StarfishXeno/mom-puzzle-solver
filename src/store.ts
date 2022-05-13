import { defineStore } from "pinia";

type NumberFields = "elementsCount" | "selectedStars" | "selectedClues";
export interface HistoryItem {
  elements: number[];
  stars: number;
  clues: number;
}
export const usePuzzleStore = defineStore("puzzle", {
  state: () => {
    return {
      elementsCount: 6,
      selected: [1, 2, 3, 4] as (number | undefined)[],
      selectedStars: 0,
      selectedClues: 0,
      history: [] as HistoryItem[],
    };
  },

  actions: {
    setSelected(selected: number[]) {
      this.selected = selected;
    },
    removeSelected(idx: number) {
      this.selected.splice(idx, 1, undefined);
    },
    pushSelected(element: number) {
      const idx = this.selected.findIndex((e) => !e);
      if (idx !== -1) {
        this.selected.splice(idx, 1, element);
      }
    },
    reset() {
      this.selected = Array(this.selected.length).fill(undefined);
      this.selectedClues = 0;
      this.selectedStars = 0;
    },
    resetHistory() {
      this.history = [];
    },
    addToHistory() {
      if (!this.selected.every((i) => i)) {
        return;
      }
      this.history.unshift({
        elements: this.selected as number[],
        stars: this.selectedStars,
        clues: this.selectedClues,
      });
      this.reset();
    },
    removeFromHistory(idx: number) {
      this.history.splice(idx, 1);
    },
    limitedIncrement(key: NumberFields, limit: number) {
      if (this[key] < limit) {
        this[key]++;
      }
    },
    limitedDecrement(key: NumberFields, limit: number) {
      if (this[key] > limit) {
        this[key]--;
      }
    },
    incrementCount() {
      this.limitedIncrement("elementsCount", 8);
    },
    decrementCount() {
      this.limitedDecrement("elementsCount", 4);
    },
    incrementStars() {
      this.limitedIncrement("selectedStars", this.selected.length);
      if (this.selectedStars + this.selectedClues > this.selected.length) {
        this.selectedClues--;
      }
    },
    decrementStars() {
      this.limitedDecrement("selectedStars", 0);
    },
    incrementClues() {
      this.limitedIncrement("selectedClues", this.selected.length);
      if (this.selectedStars + this.selectedClues > this.selected.length) {
        this.selectedStars--;
      }
    },
    decrementClues() {
      this.limitedDecrement("selectedClues", 0);
    },
  },
  getters: {
    elements(state) {
      return Array(state.elementsCount)
        .fill(0)
        .map((_, idx) => idx + 1);
    },
  },
});

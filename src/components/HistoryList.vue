<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import StarIcon from "./icons/StarIcon.vue";
import ClueIcon from "./icons/ClueIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";

const store = usePuzzleStore();
const { history } = storeToRefs(store);
const { removeFromHistory, resetHistory } = store;
</script>

<template>
  <div class="row" v-for="(item, idx) in history" :key="idx">
    <div class="elements">
      <div class="item-number">{{ history.length - idx }}.</div>

      <div v-for="el in item.elements" :key="el" class="element selected">
        {{ el }}
      </div>
    </div>
    <div class="results">
      <StarIcon v-for="(_, idx) in Array(item.stars).fill(0)" :key="idx" />
      <ClueIcon v-for="(_, idx) in Array(item.clues).fill(0)" :key="idx" />
    </div>
    <div class="buttons">
      <button @click="removeFromHistory(idx)"><TrashIcon /></button>
    </div>
  </div>
  <div class="buttons control">
    <button
      @click="resetHistory"
      class="reset-button"
      :disabled="history.length === 0"
    >
      RESET
    </button>
  </div>
</template>
<style scoped>
.row {
  margin-bottom: 0.5em;
}
.results {
  display: flex;
  align-items: center;
}
.buttons {
  display: flex;
  justify-content: end;
}
.buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.row button {
  padding: 0;
  height: 100%;
}
.reset-button {
  width: 8rem;
  padding: 0.7rem 0;
}
.item-number {
  font-size: 1.5em;
  margin-right: 1em;
  display: flex;
  align-items: flex-end;
}
@media screen and (max-width: 500px) {
  .row {
    display: block;
  }
  .results,
  .buttons {
    display: inline-flex;
  }
  .buttons.control {
    justify-content: center;
  }
}
</style>

<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import StarIcon from "./icons/StarIcon.vue";
import ClueIcon from "./icons/ClueIcon.vue";
import { computed, ref } from "vue";
import { checkSolution } from "@/solver";
import VariantsModal from "./VariantsModal.vue";

const store = usePuzzleStore();
const { selected, history, selectedStars, selectedClues } = storeToRefs(store);
const {
  incrementStars,
  decrementStars,
  incrementClues,
  decrementClues,
  removeSelected,
  addToHistory,
  reset,
} = store;
const filledOut = computed(() => selected.value.every((s) => s));
const validError = computed(
  () =>
    filledOut.value && checkSolution(history.value, selected.value as number[])
);
const showSolutions = ref(false);
</script>

<template>
  <VariantsModal v-if="showSolutions" @close="showSolutions = false" />
  <div class="row">
    <div
      class="elements"
      :class="{
        valid: filledOut && !validError,
        invalid: filledOut && validError,
      }"
    >
      <div
        v-for="(el, idx) in selected"
        :key="el"
        class="element"
        :class="{ selected: !!el }"
        @click="removeSelected(idx)"
      >
        {{ el || "&nbsp;&nbsp;" }}
      </div>
    </div>
    <div class="buttons">
      <div class="stars">
        <label>
          {{ selectedStars }}x
          <StarIcon />
        </label>

        <button @click="incrementStars">+</button>
        <button @click="decrementStars">-</button>
      </div>
      <div class="clues">
        <label>
          {{ selectedClues }}x
          <ClueIcon />
        </label>
        <button @click="incrementClues">+</button>
        <button @click="decrementClues">-</button>
      </div>
    </div>
  </div>
  <div v-if="validError" class="error-message">{{ validError }}</div>
  <div class="buttons control">
    <button @click="showSolutions = true" style="width: 20rem">
      FIND SOLUTIONS
    </button>
    <button @click="reset">RESET</button>
    <button :disabled="!filledOut" @click="addToHistory">ADD</button>
  </div>
</template>
<style scoped>
.row {
  margin: 1em 0;
}

.buttons label {
  font-size: 2em;
  display: flex;
  align-items: center;
  margin-left: 0.5em;
}
.stars,
.clues {
  display: flex;
}
.buttons {
  justify-content: end;
}
.buttons button {
  padding: 0.7rem 0;
}

.buttons.control button {
  width: 8rem;
  margin-left: 1rem;
}
.invalid .element {
  background: #ffaaaa;
}
.valid .element {
  background: #aaffaa;
}
.error-message {
  color: #ffaaaa;
  margin: 1em 0;
}
@media screen and (max-width: 500px) {
  .buttons {
    justify-content: space-between;
  }
  .buttons.control {
    flex-direction: column;
    align-items: center;
  }
  .stars,
  .clues {
    display: block;
  }
}
</style>

<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import StarIcon from "./icons/StarIcon.vue";
import ClueIcon from "./icons/ClueIcon.vue";
import { computed, ref } from "vue";
import { checkSolution } from "@/solver";
import SolutionsModal from "./SolutionsModal.vue";
import ElementList from "./elements/ElementList.vue";
import IncrDecrButtons from "./elements/IncrDecrButtons.vue";
import StyledButton from "./elements/StyledButton.vue";

const store = usePuzzleStore();
const { selected, history, selectedStars, selectedClues } = storeToRefs(store);
const {
  incrementStars,
  decrementStars,
  incrementClues,
  decrementClues,
  incrementSlotsCount,
  decrementSlotsCount,
  removeSelected,
  addToHistory,
  reset,
} = store;
const filledOut = computed(() => selected.value.every((s) => s));
const validationError = computed(
  () =>
    filledOut.value && checkSolution(history.value, selected.value as number[])
);
const showSolutions = ref(false);
const onElementClicked = (_: number, idx: number) => removeSelected(idx);
</script>

<template>
  <SolutionsModal v-if="showSolutions" @close="showSolutions = false" />
  <div class="row">
    <ElementList
      :elements="selected"
      :class="{
        valid: filledOut && !validationError,
        invalid: filledOut && validationError,
      }"
      @element-clicked="onElementClicked"
      check-selection
    />

    <IncrDecrButtons
      @increment="incrementSlotsCount"
      @decrement="decrementSlotsCount"
    />
  </div>
  <div class="stars-clues">
    <div class="error-message">
      {{ validationError || "" }}
    </div>
    <div class="buttons">
      <div class="stars">
        <label>
          {{ selectedStars }}x
          <StarIcon />
        </label>
        <IncrDecrButtons
          @increment="incrementStars"
          @decrement="decrementStars"
        />
      </div>
      <div class="clues">
        <label>
          {{ selectedClues }}x
          <ClueIcon />
        </label>
        <IncrDecrButtons
          @increment="incrementClues"
          @decrement="decrementClues"
        />
      </div>
    </div>
  </div>

  <div class="control-buttons">
    <StyledButton style="width: 310px" @click="showSolutions = true">
      find solutions
    </StyledButton>
    <StyledButton style="width: 130px" @click="reset">reset</StyledButton>
    <StyledButton
      style="width: 130px"
      :disabled="!filledOut"
      @click="addToHistory"
    >
      add
    </StyledButton>
  </div>
</template>
<style scoped>
.stars-clues {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.stars-clues .buttons {
  display: flex;
}
.stars-clues label {
  font-size: 2em;
  display: flex;
  align-items: center;
  margin-left: 0.5em;
}
.stars,
.clues {
  display: flex;
  justify-content: center;
  align-items: center;
}

.invalid:deep() .element {
  background: #ffaaaa;
}
.valid:deep() .element {
  background: #aaffaa;
}
.error-message {
  color: #ffaaaa;
  max-width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-buttons {
  display: flex;
  column-gap: 0.5rem;
  justify-content: end;
}

@media screen and (max-width: 500px) {
  .stars-clues {
    flex-direction: column;
    align-items: center;
  }
  .stars,
  .clues {
    flex-direction: column;
  }
  .stars-clues .buttons {
    width: 100%;
    justify-content: space-around;
  }
  .error-message {
    max-width: 100%;
    text-align: center;
  }
  .control-buttons {
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
  }
}
</style>

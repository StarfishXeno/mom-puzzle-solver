<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import StarIcon from "./icons/StarIcon.vue";
import ClueIcon from "./icons/ClueIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";
import ElementList from "./elements/ElementList.vue";
import StyledButton from "./elements/StyledButton.vue";

const store = usePuzzleStore();
const { history } = storeToRefs(store);
const { removeFromHistory, resetHistory } = store;
</script>

<template>
  <div v-for="(item, idx) in history" :key="idx">
    <div class="item-number">{{ history.length - idx }}.</div>
    <div class="row">
      <ElementList :elements="item.elements" check-selection />

      <div class="results">
        <StarIcon v-for="(_, idx) in Array(item.stars).fill(0)" :key="idx" />
        <ClueIcon v-for="(_, idx) in Array(item.clues).fill(0)" :key="idx" />
      </div>
      <div class="buttons">
        <StyledButton style="width: 65px" @click="removeFromHistory(idx)">
          <TrashIcon />
        </StyledButton>
      </div>
    </div>
  </div>
  <div class="control-buttons">
    <StyledButton
      style="width: 130px"
      @click="resetHistory"
      :disabled="history.length === 0"
    >
      reset
    </StyledButton>
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
.item-number {
  font-size: 1.5em;
  margin-right: 1em;
  display: flex;
  align-items: flex-end;
}
.control-buttons {
  display: flex;
  justify-content: end;
}
@media screen and (max-width: 500px) {
  .row {
    align-items: center;
  }
  .results {
    margin-bottom: 0.5rem;
  }
}
</style>

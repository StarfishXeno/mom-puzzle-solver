<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { findSolutions } from "@/solver";
import ElementList from "./elements/ElementList.vue";
import StyledButton from "./elements/StyledButton.vue";

const MAX_LENGTH = 100;
const store = usePuzzleStore();
const { history, elements, slotsCount } = storeToRefs(store);
const solutions = computed(() =>
  findSolutions(history.value, elements.value, slotsCount.value)
);
const visibleSolutions = computed(() => solutions.value.slice(0, MAX_LENGTH));
const { setSelected } = store;
const emit = defineEmits(["close"]);
const acceptSolution = (variant: number[]) => {
  setSelected(variant);
  emit("close");
};
</script>

<template>
  <div class="modal" @click="emit('close')">
    <div class="container" @click="$event.stopPropagation()">
      <h1>
        Total solutions: {{ solutions.length }}
        {{ solutions.length > MAX_LENGTH ? `(showing ${MAX_LENGTH})` : "" }}
      </h1>
      <div class="row" v-for="(elements, idx) in visibleSolutions" :key="idx">
        <ElementList :elements="elements" check-selection />
        <StyledButton @click="acceptSolution(elements)">add</StyledButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: #1d2021;
  border: 1px solid #f9f5d7;
  padding: 1em;
  max-height: 80vh;
  max-width: 90%;
  overflow-y: auto;
}
.container h1 {
  margin-bottom: 0.5rem;
}
.buttons button {
  width: 5rem;
}
</style>

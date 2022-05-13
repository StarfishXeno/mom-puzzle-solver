<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { findSolutions } from "@/solver";

const store = usePuzzleStore();
const { history, elements, slotsCount } = storeToRefs(store);
const variants = computed(() =>
  findSolutions(history.value, elements.value, slotsCount.value)
);
const { setSelected } = store;
const emit = defineEmits(["close"]);
const acceptVariant = (variant: number[]) => {
  setSelected(variant);
  emit("close");
};
</script>

<template>
  <div class="modal" @click="emit('close')">
    <div class="container" @click="$event.stopPropagation()">
      <h1>Total variants: {{ variants.length }}</h1>
      <div class="row" v-for="(elements, idx) in variants" :key="idx">
        <div class="elements">
          <div v-for="el in elements" :key="el" class="element selected">
            {{ el }}
          </div>
        </div>
        <div class="buttons">
          <button @click="acceptVariant(elements)">ADD</button>
        </div>
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
.row {
  margin-top: 0.5em;
}
.container {
  background: #1d2021;
  border: 1px solid #f9f5d7;
  padding: 1em;
  max-height: 80vh;
  overflow-y: auto;
}
.buttons button {
  width: 5rem;
}
</style>

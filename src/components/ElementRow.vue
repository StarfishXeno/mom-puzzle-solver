<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";

const store = usePuzzleStore();
const { elements } = storeToRefs(store);
const { incrementCount, decrementCount, pushSelected } = store;
</script>

<template>
  <div class="row">
    <div class="elements">
      <div
        v-for="el in elements"
        :key="el"
        class="element"
        @click="pushSelected(el)"
      >
        {{ el }}
      </div>
    </div>
    <div class="buttons">
      <button @click="incrementCount">+</button>
      <button @click="decrementCount">-</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePuzzleStore } from "@/store";
import { storeToRefs } from "pinia";
import ElementList from "./elements/ElementList.vue";
import IncrDecrButtons from "./elements/IncrDecrButtons.vue";

const store = usePuzzleStore();
const { elements } = storeToRefs(store);
const { incrementCount, decrementCount, pushSelected } = store;
const onElementClicked = (el: number) => pushSelected(el);
</script>

<template>
  <div class="row">
    <ElementList @element-clicked="onElementClicked" :elements="elements" />
    <IncrDecrButtons @increment="incrementCount" @decrement="decrementCount" />
  </div>
</template>

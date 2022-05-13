<script setup lang="ts">
const emit = defineEmits(["elementClicked"]);
defineProps<{
  elements: (number | undefined)[];
  checkSelection?: boolean;
}>();
</script>

<template>
  <div class="elements">
    <div
      v-for="(el, idx) in elements"
      :key="el"
      class="element"
      :class="{ selected: checkSelection && el }"
      @click="emit('elementClicked', el, idx)"
    >
      {{ el || "" }}
    </div>
  </div>
</template>

<style scoped>
.elements {
  display: flex;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
}
.element {
  font-size: 1.5em;
  border: 1px solid #f9f5d7;
  height: 65px;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.element.selected {
  color: #1d2021;
  background: #f9f5d7;
}
@media screen and (max-width: 500px) {
  .elements {
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
}
</style>

<script setup lang="ts">
import StyledButton from "./StyledButton.vue";
const emit = defineEmits(["increment", "decrement"]);
</script>
<template>
  <div class="incr-decr-buttons">
    <StyledButton @click="emit('increment')">+</StyledButton>
    <StyledButton @click="emit('decrement')">-</StyledButton>
  </div>
</template>

<style scoped>
.incr-decr-buttons:deep() button {
  width: 65px;
}
</style>

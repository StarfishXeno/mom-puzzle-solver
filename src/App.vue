<script setup lang="ts">
import ElementRow from "./components/ElementRow.vue";
import SelectionRow from "./components/SelectionRow.vue";
import HistoryList from "./components/HistoryList.vue";
</script>

<template>
  <h1 style="margin-bottom: 0.5rem">
    Mansions of Madness combination puzzle solver
  </h1>
  <ElementRow />
  <SelectionRow />
  <h2 style="margin: 0.5rem 0">History:</h2>
  <HistoryList />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Roboto", sans-serif;
  background: #1d2021;
}
#app {
  color: #f9f5d7;
  width: 800px;
  margin: 2em auto;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 500px) {
  #app {
    padding: 0.5em;
    width: auto;
  }
  .row {
    flex-direction: column;
    justify-content: center;
  }

  .incr-decr-buttons {
    display: flex;
    justify-content: center;
    column-gap: 0.5rem;
  }
}
</style>

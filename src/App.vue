<script setup lang="ts">
import ElementRow from "./components/ElementRow.vue";
import SelectionRow from "./components/SelectionRow.vue";
import HistoryList from "./components/HistoryList.vue";
</script>

<template>
  <h1 style="margin-bottom: 1em">
    Mansions of Madness combination puzzle solver
  </h1>
  <ElementRow />
  <SelectionRow />
  <h2 style="margin-bottom: 0.5em">History:</h2>
  <HistoryList />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
  background: #1d2021;
}
#app {
  color: #f9f5d7;
  width: fit-content;
  margin: 2em auto;
}
.row {
  display: flex;
  justify-content: space-between;
}
.elements {
  display: flex;
}
.element {
  padding: 0.7em 1em;
  font-size: 1.5em;
  border: 1px solid #f9f5d7;
  margin-right: 0.5em;
}
.element.selected {
  color: #1d2021;
  background: #f9f5d7;
}
.buttons {
  display: flex;
  align-items: center;
}
.buttons button {
  padding: 0.7rem 0;
  width: 4rem;
  font-size: 2em;
}
@media screen and (max-width: 500px) {
  .elements {
    flex-wrap: wrap;
  }
  .row {
    flex-direction: column;
  }
  .buttons {
    margin: 1em 0;
  }
  #app {
    padding: 0.5em;
  }
}
</style>

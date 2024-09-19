<script setup lang="ts">
import { ref } from 'vue';

const query = ref<string>('');

const emit = defineEmits<{
  (event: 'search', query: string): void;
}>();

function onSearch() {
  emit('search', query.value);
}
</script>

<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      placeholder="Search for a character..."
      @input="onSearch"
    />
    <!-- <button @click="onSearch">🔍</button> -->
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  background-color: #000000b5;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 255, 0, 0.5);
}

.search-bar input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: transparent;
  outline: none;
}

.search-bar input::placeholder {
  color: #cccccc;
  font-style: italic;
}

.search-bar button {
  background-color: #00ff00;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  color: #2c2c2c;
  font-weight: bold;
  margin-left: 8px;
  transition: background-color 0.3s;
}

.search-bar button:hover {
  background-color: #00cc00;
}
</style>

<script setup lang="ts">
interface InfoType {
  id: string | number;
  value: string | number | boolean;
  icon: string;
}

export interface CardInfosProps {
  infos: InfoType[];
}
</script>

<template>
  <div class="card-info-container">
    <div v-for="info in infos" :key="info.id" class="card-info">
      <span class="card-info-icon">{{ info.icon }}</span>
      <span class="card-info-value">{{ info.value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-info-container {
  width: 100%;
  display: flex;
  gap: 12px;
  position: absolute;
  border: 0;
  bottom: 12px;
  @media (max-width: 768px) {
    position: unset;
    column-count: 2;
    padding-top: 14px;
    display: block;
  }
}

.card-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.3s;
}

.card-info:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.card-info-icon {
  font-size: 1em;
  margin-right: 8px;
  color: #ffeb3b;
}

.card-info-value {
  font-size: 0.8em;
  color: #ffffff;
}
</style>

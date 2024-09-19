<script setup lang="ts">
import { computed } from 'vue';

export interface CardProps {
  dataTestId?: string;
  index?: number;
}

const props = defineProps<CardProps>();

const computedDataTestId = computed(() => {
  return props.dataTestId || 'card';
});
</script>
<template>
  <div
    class="card"
    :data-testid="`${computedDataTestId}${index !== undefined ? `-${index}` : ''}`"
  >
    <slot :index="index"></slot>
  </div>
</template>

<style scoped lang="scss">
.card {
  overflow: hidden;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  transition: border-color 150ms linear;
  gap: var(--spacing-small);
  position: relative;

  &:hover {
    border-color: var(--color-primary-dark);
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

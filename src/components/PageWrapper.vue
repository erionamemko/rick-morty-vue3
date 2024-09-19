<script setup lang="ts">
import { computed } from 'vue';

export interface PageWrapperProps {
  title?: string;
  dataTestId?: string;
}

const props = defineProps<PageWrapperProps>();

const computedDataTestId = computed(() => {
  return props?.dataTestId || 'page-wrapper';
});
</script>

<template>
  <div :data-testid="computedDataTestId" class="page-wrapper-container">
    <h2 v-if="!!title" :data-testid="`${computedDataTestId}-title`">
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-x-large);
  h2 {
    font-family: 'Comic Sans MS', cursive;
    font-weight: 100;
  }
}
</style>

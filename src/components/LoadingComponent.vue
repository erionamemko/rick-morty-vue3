<script setup lang="ts">
import { computed } from 'vue';

import rick from '@/assets/rick-and-morty-portal.png';

export interface LoadingComponentProps {
  dataTestId?: string;
}

const props = defineProps<LoadingComponentProps>();

const computedDataTestId = computed(() => {
  return props.dataTestId || 'loading-component';
});
</script>

<template>
  <div :data-testid="computedDataTestId" class="loading-overlay">
    <img :data-testid="`${computedDataTestId}-image`" :src="rick" alt="Rick" />
  </div>
</template>

<style scoped lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  & img {
    width: 340px;
    height: 340px;
    max-width: 96%;
    animation: rotate 2s linear infinite;
  }
}
</style>

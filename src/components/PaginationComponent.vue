<script setup lang="ts">
import { computed } from 'vue';

import Prev from '@/assets/icons/chevron_left.svg';
import Next from '@/assets/icons/chevron_right.svg';
import Last from '@/assets/icons/next.svg';
import First from '@/assets/icons/prev.svg';
import { useMediaQuery } from '@/composables';
import { InfoType as Pagination } from '@/models';

export interface PaginationComponentProps extends Partial<Pagination> {
  page: number;
  loading?: boolean;
  dataTestId?: string;
  onPageChange(page: number): void;
}

const { isDesktop } = useMediaQuery();

const props = defineProps<PaginationComponentProps>();

const paginationButtons = computed(() => {
  if (props?.pages === 1) {
    return [1];
  }

  let visiblePages = !isDesktop.value ? 3 : 5;
  if ((props?.pages || 0) < visiblePages) {
    visiblePages = props?.pages || 0;
  }
  let startPage = 1;

  if (props.page > visiblePages) {
    startPage = props.page;
  }

  if (props.page > (props?.pages || 0) - visiblePages) {
    startPage = (props?.pages || 0) - visiblePages + 1;
  }

  return Array(visiblePages)
    .fill(null)
    .map((_, index) => index + startPage);
});

const computedDataTestId = computed(() => {
  return props.dataTestId || 'pagination-component';
});
</script>

<template>
  <div
    v-if="(props?.pages || 0) < 1 || loading"
    :data-testid="`${computedDataTestId}-empty`"
  />
  <div v-else :data-testid="computedDataTestId" class="pagination-container">
    <button
      :disabled="page === 1"
      :data-testid="`${computedDataTestId}-first`"
      title="Prima pagina"
      @click="onPageChange(1)"
    >
      <img
        :data-testid="`${computedDataTestId}-first-icon`"
        :src="First"
        alt="First icon"
      />
    </button>
    <button
      title="Pagina precedente"
      :data-testid="`${computedDataTestId}-prev`"
      :disabled="page === 1"
      @click="onPageChange(page - 1)"
    >
      <img
        :data-testid="`${computedDataTestId}-prev-icon`"
        :src="Prev"
        alt="Prev icon"
      />
    </button>
    <button
      v-for="pageButton in paginationButtons"
      :key="pageButton"
      :data-testid="`${computedDataTestId}-button-${pageButton}`"
      :disabled="pageButton === props.page"
      :title="`Vai nella pagina ${pageButton}`"
      @click="onPageChange(pageButton)"
    >
      {{ pageButton }}
    </button>
    <button
      title="Prossima pagina"
      :data-testid="`${computedDataTestId}-next`"
      :disabled="page === props.pages"
      @click="onPageChange(page + 1)"
    >
      <img :src="Next" alt="Next icon" />
    </button>
    <button
      title="Ultima pagina"
      :data-testid="`${computedDataTestId}-last`"
      :disabled="page === props.pages"
      @click="onPageChange(props.pages || props.page)"
    >
      <img :src="Last" alt="Last icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);

  & > button {
    min-width: 36px;
    min-height: 28px;
    display: flex;
    line-height: 1rem;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: var(--color-white);
    & img {
      width: 18px;
      height: auto;
    }
  }
}
</style>

import { ref, onMounted, onUnmounted } from 'vue';

export function useMediaQuery() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const updateMediaQuery = () => {
    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024;
    isDesktop.value = window.innerWidth >= 1024;
  };

  onMounted(() => {
    window.addEventListener('resize', updateMediaQuery);
    updateMediaQuery();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateMediaQuery);
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

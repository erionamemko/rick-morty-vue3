<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

import { RouterView, RouterLink } from 'vue-router';

import { links } from './config';
import menu from '@/assets/icons/menu.svg';
import logo from '@/assets/logo-rick-morty.svg';
import logoHead from '@/assets/rick.png';
import { useMediaQuery } from '@/composables';

const { isDesktop } = useMediaQuery();
const open = ref<boolean>(false);

const computedFooter = computed(() => {
  return window.innerHeight - 50;
});

const toggleOpen = () => {
  open.value = !open.value;
};

function closeMenu(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false;
  }
}

onMounted(() => {
  window.addEventListener('keyup', closeMenu);
});

onUnmounted(() => {
  window.removeEventListener('keyup', closeMenu);
});
</script>

<template>
  <div class="app-container">
    <header class="header-container">
      <div class="container nav">
        <RouterLink to="/" class="router-link">
          <img class="logo-head" :src="logoHead" alt="Rick and Morty logo" />
          <img class="logo" :src="logo" alt="Rick and Morty logo" />
        </RouterLink>
        <div v-if="isDesktop" class="links-container">
          <RouterLink v-for="link in links" :key="link.id" :to="link.path">
            {{ link.label }}
          </RouterLink>
        </div>
        <div v-else>
          <Transition key="overlay" mode="out-in" name="slide-fade">
            <div
              v-if="open"
              role="presentation"
              class="overlay"
              @click="toggleOpen"
            >
              <Transition key="sidenav" mode="out-in" name="slide-right">
                <div v-if="open" class="sidenav">
                  <RouterLink
                    v-for="link in links"
                    :key="link.id"
                    :to="link.path"
                  >
                    {{ link.label }}
                  </RouterLink>
                </div>
              </Transition>
            </div>
          </Transition>
          <button @click="toggleOpen">
            <img :src="menu" alt="menu" />
          </button>
        </div>
      </div>
    </header>
    <div class="container main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in" name="slide-fade">
          <Component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
    <footer
      class="header-container footer-container"
      :style="`top: ${computedFooter}px`"
    ></footer>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 12;
  background-color: rgba(0, 0, 0, 0.5);
}

.sidenav {
  width: 30vh;
  height: 100vh;
  background-color: var(--color-black);
  display: flex;
  position: absolute;
  right: 0;
  z-index: 13;
  flex-direction: column;
  gap: var(--spacing-normal);
  padding: var(--spacing-normal);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
.router-link {
  display: flex;
  align-items: center;
}
.logo-head {
  width: 50px;
  height: auto;
}
.logo {
  width: 50px;
  height: auto;

  width: 10rem;
  height: auto;
  padding: 0.8rem;
}

.header-container {
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-small) 0;
  background-color: #060606;
  position: sticky;
  top: 0;
  z-index: 11;

  &::after {
    position: absolute;
    content: '';
    bottom: 0px;
    left: 0;
    right: 0;
    height: 4px;
    width: 100%;
    background: linear-gradient(
      90deg,
      #060606,
      var(--color-primary) 25%,
      var(--color-primary-light) 49%,
      var(--color-primary-dark) 73%,
      #060606
    );
    background-size: 400% 400%;
    animation: gradient 4s ease infinite;
  }
}

.footer-container {
  bottom: 0;
  left: 0;
  height: 50px;

  & p {
    text-align: center;
  }
  &::after {
    position: absolute;
    content: '';
    top: 0px;
    left: 0;
    right: 0;
    height: 4px;
    width: 100%;
    background: linear-gradient(
      90deg,
      #060606,
      var(--color-primary) 25%,
      var(--color-primary-light) 49%,
      var(--color-primary-dark) 73%,
      #060606
    );
    background-size: 400% 400%;
    animation: gradient 4s ease infinite;
  }
}

.main-content {
  padding-top: var(--spacing-large);
  padding-bottom: var(--spacing-xxx-large);
}

.links-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-normal);
  font-size: larger;
}
.app-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  max-height: 100vh;
}

.slide-fade-enter-active {
  transition: all 300ms linear;
}

.slide-fade-leave-active {
  transition: all 300ms linear;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-right-enter-active {
  transition: all 300ms linear;
}

.slide-right-leave-active {
  transition: all 300ms linear;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(30vh);
}
</style>

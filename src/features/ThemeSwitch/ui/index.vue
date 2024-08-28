<script setup lang="ts">
import { Icon } from "@iconify/vue";

enum Theme {
  light = 'light-theme',
  dark = 'dark-theme',
}

onMounted(() => {
  const initUserTheme = getTheme() || getMediaPreference();
  setTheme(initUserTheme as Theme);
});

const userTheme = ref(Theme.light);

const toggleTheme = () =>
  localStorage.getItem('user-theme') === Theme.light
    ? setTheme(Theme.dark)
    : setTheme(Theme.light);

const setTheme = (theme: Theme) => {
  localStorage.setItem('user-theme', theme);
  userTheme.value = theme;
  document.documentElement.className = theme;
};

const getMediaPreference = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.dark
    : Theme.light

const getTheme = () =>
  localStorage.getItem('user-theme');
</script>

<template>
  <div>
    <input @change="toggleTheme" id="theme-switch" type="checkbox" class="switch-checkbox" />
    <label for="theme-switch" class="switch-label noselect">
      <Icon icon="gravity-ui:sun" />
      <Icon icon="gravity-ui:moon" />
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }">
      </div>
    </label>
  </div>
</template>

<style scoped lang="scss">
.switch-checkbox {
  display: none;
}
  
.switch-label {
  align-items: center;
  background: var(--background-900);
  cursor: pointer;
  display: flex;
  border-radius: $large;
  font-size: $large;
  position: relative;
  gap: 0.5em;
  padding: 0.5em;
  z-index: 1;
}
  
.switch-toggle {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  transform: translateX(0);
  width: 1.2em;
  height: 1.2em;
  transition: transform 0.3s ease;
  z-index: 2;
}

.switch-toggle-checked {
  transform: translateX(1.3em) !important;
}
</style>

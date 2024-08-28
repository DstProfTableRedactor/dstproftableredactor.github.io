<script lang="ts" setup>
import { ThemeSwitch } from '~/features/ThemeSwitch';
</script>

<template>
  <header class="admin-header">
    <h1 class="admin-header-title">
      Заголовок
    </h1>
    <ThemeSwitch/>
  </header>
</template>

<style scoped lang="scss">
.admin-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  border-bottom: 1px solid var(--background-800);
  box-sizing: border-box;
}

h1.admin-header-title {
  margin: 0;
  padding: 0;
  font-size: $larger;
  color: var(--text-950);
}
</style>
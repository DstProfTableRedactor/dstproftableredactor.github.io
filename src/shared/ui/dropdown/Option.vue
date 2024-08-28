<script setup lang="ts">
interface Props {
  text: string,
  disabled?: boolean,
}
const props = defineProps<Props>()
</script>

<template>
  <li :disabled="props.disabled">
    {{ props.text }}
  </li>
</template>

<style scoped lang="scss">
li {
  color: var(--text-950);
  border-bottom: 1px solid var(--background-700);
  user-select: none;
  font-size: $medium;
  padding: $padding;
  margin: 0;
}

li[disabled="true"] {
  opacity: 0.4;
  pointer-events: none;
}

li[disabled="false"]:hover {
  cursor: pointer;
  background: var(--background-800); 
}

li:last-child {
  border-bottom: none;
  border-radius: 0 0 $borderRadius $borderRadius
}

li:first-child {
  border-radius: $borderRadius $borderRadius 0 0
}
</style>
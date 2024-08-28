<script setup lang="ts">
import { type SelectOption } from './index.vue';

const props = defineProps<{
  option: SelectOption,
}>();
</script>

<template>
<option
  class="option"
  :value="option.key">
      {{ props.option.value }}
</option>
</template>

<style scoped lang="scss">
option {
  appearance: none;
}

option:checked {
  background-color: var(--background-800) !important;  
  color: var(--text-950);
}

.option:hover {
  background-color: var(--background-700);
}
</style>
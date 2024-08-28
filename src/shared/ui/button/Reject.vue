<script lang="ts" setup>
interface Props {
  isLoading?: boolean,
  disabled?: boolean
}
const props = defineProps<Props>();
</script>

<template>
  <ButtonFilled
    class="reject-button"
    :disabled="props.disabled"
    :is-loading="props.isLoading">
    <slot />
  </ButtonFilled>
</template>

<style scoped lang="scss">

.reject-button {  
  background-color: var(--error-500);
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-error-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-error-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-error-500-50);
}

.reject-button:hover {
  background-color: var(--error-400);
}

.reject-button:active {
  background-color: var(--error-400);
}

.reject-button:disabled {
  background-color: var(--error-600);
}
</style>
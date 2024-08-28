<script lang="ts" setup>
interface Props {
  isActive: boolean
}
const props = defineProps<Props>();
</script>

<template>
  <div
    :class="{ 'active': props.isActive }" 
    class="is-active-indicator">
  </div>
</template>

<style scoped lang="scss">
.is-active-indicator {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: var(--primary-600);
  -webkit-box-shadow: 0px 0px 2px 1px var(--transparent-primary-500-50);
  -moz-box-shadow: 0px 0px 2px 1px var(--transparent-primary-500-50);
  box-shadow: 0px 0px 2px 1px var(--transparent-primary-500-50);
}

.active {
  background-color: var(--secondary-600);
  -webkit-box-shadow: 0px 0px 2px 1px var(--transparent-secondary-600-50);
  -moz-box-shadow: 0px 0px 2px 1px var(--transparent-secondary-600-50);
  box-shadow: 0px 0px 2px 1px var(--transparent-secondary-600-50);
}
</style>
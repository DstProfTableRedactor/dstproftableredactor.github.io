<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="alert-icon-background">
    <Icon 
    class="alert-icon"
    icon="uil:exclamation"/>
  </div>
</template>

<style scoped lang="scss">
.alert-icon-background {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: var(--error-400);
  -webkit-box-shadow: 0px 0px 2px 1px var(--transparent-error-400-50);
  -moz-box-shadow: 0px 0px 2px 1px var(--transparent-error-400-50);
  box-shadow: 0px 0px 2px 1px var(--transparent-error-400-50);
}

.alert-icon {
  color: white;
  font-size: $large;
  align-self: center;
  justify-self: center;
}
</style>
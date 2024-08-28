<script lang="ts" setup>
import LoadingCircle from '../loading/Circle.vue';

interface Props {
  isLoading?: boolean,
  disabled?: boolean
}
const props = defineProps<Props>();
</script>

<template>
  <button 
    class="filled-button"
    :disabled="disabled">
      <LoadingCircle
        class="button-loading-indicator"
        v-if="props.isLoading"/>
      <div 
        class="button-content-wrapper" 
        :class="{ 'button-hidden-text': props.isLoading }">
          <slot/>
      </div>
  </button>
</template>

<style scoped lang="scss">
.filled-button {
  font-family: "TildaSans";
  font-size: $medium;
  color: white;
  padding: $padding;
  background-color: var(--accent-500);
  border: none;
  border-radius: $borderRadius;
  transition: all 100ms ease-out;
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.filled-button:hover {
  background-color: var(--accent-400);
  cursor: pointer;
}

.filled-button:active {
  background-color: var(--accent-300);
}

.filled-button:disabled {
  cursor: default;
  opacity: 0.5;
  background-color: var(--accent-600);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.button-hidden-text {
  visibility: hidden;
}

.button-content-wrapper {
  display: flex;
  align-items: center;
  padding: 0;
  width: fit-content;
  height: max-content;
}

.button-loading-indicator {
  position: absolute;
}
</style>
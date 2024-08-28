<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <details class="accordion">
    <summary class="accordion-summary">
      <slot name="summary"/> 
      <Icon class="accordion-arrow-icon" icon="majesticons:chevron-down" />
    </summary>
    
    <div class="summary-content">
      <slot name="content"/>
    </div>
  </details>
</template>

<style scoped lang="scss">
details summary {
  color: var(--text-950);
  list-style: none;
  display: flex;
  cursor: pointer;
  transition: background-color 100ms ease-out;
  align-items: center;
  justify-content: center;
  user-select: none;
  gap: $gap;
}

details[open] summary ~ * {
  animation: open 0.2s ease-in-out;
}

@keyframes open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


.summary-title {
  font-size: 1.3rem;
}

.arrow-icon {
  transition: all 100ms ease-out;
  align-self: center;
}

details[open] > summary .arrow-icon {
  transform: rotate(-180deg);
}
</style>

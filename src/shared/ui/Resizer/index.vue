<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue';

type Props = {
  minWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: 150,
});

const parentRef = ref();
const firstWidth = ref(450);
const firstWidthPx = computed(() => `${firstWidth.value}px`);
const isDragging = ref(false);

const handleMouseDown = () => {
  isDragging.value = true;
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    const newWidth = event.clientX;
    if (newWidth > props.minWidth && parentRef.value.clientWidth - newWidth > props.minWidth)
      firstWidth.value = newWidth;
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};
</script>

<template>
  <div
    class="parent"
    ref="parentRef"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    :class="{ 'resizing': isDragging }">
    <div
      class="resizer__first-panel"
      ref="firstRef">
      <slot name="first" />
    </div>
    <div
      class="separator-row"
      @mousedown="handleMouseDown">
      <div class="separator-row__line"></div>
      <div class="separator-row__line"></div>
    </div>
    <div class="resizer__second-panel">
      <slot name="second" />
    </div>
  </div>
</template>

<style scoped>
.parent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.separator-row {
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  padding: 2px;
  background-color: var(--background-900);
}

.separator-row__line {
  height: 20px;
  width: 2px;
  border-radius: 2px;
  background-color: var(--background-800);
  cursor: col-resize;
}

.resizer__first-panel {
  display: flex;
  width: v-bind(firstWidthPx);
  overflow: hidden;
}

.resizer__second-panel {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.resizing {
  user-select: none;
}
</style>

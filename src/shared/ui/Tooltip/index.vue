<script setup lang="ts">
interface Props {
  text: string,
  direction?: 'up' | 'right' | 'down' | 'left'
}
const props = withDefaults(defineProps<Props>(), { direction: 'up' });

const tooltipParent = ref<HTMLElement>();
const tooltipText = ref<HTMLElement>();

const pHeight = ref(0);
const pWidth = ref(0);
const parentXcoords = ref(0);
const parentYcoords = ref(0);
const tHeight = ref(0);
const tWidth = ref(0);

const interval = ref<NodeJS.Timeout>();

const setSizes = () => {
  if (!tooltipParent.value || !tooltipText.value) {
    return
  }
  pHeight.value = tooltipParent.value!.offsetHeight;
  pWidth.value = tooltipParent.value!.offsetWidth;
  parentXcoords.value = tooltipParent.value!.getBoundingClientRect().top;
  parentYcoords.value = tooltipParent.value!.getBoundingClientRect().left  
  tHeight.value = tooltipText.value!.offsetHeight;
  tWidth.value = tooltipText.value!.offsetWidth;
}

onMounted(() => {
  interval.value = setInterval(() => {setSizes()}, 100)
})

onUnmounted(() => {
  clearInterval(interval.value);
})

const parentHeight = computed(() => {
  return pHeight.value + 'px'
})

const parentWidth = computed(() => {
  return pWidth.value + 'px'
})

const parentXpos = computed(() => {
  return parentXcoords.value + 'px'
})

const parentYpos = computed(() => {
  return parentYcoords.value + 'px'
})

const tooltipHeight = computed(() => {
  return tHeight.value + 'px'
})

const tooltipWidth = computed(() => {
  return  tWidth.value + 'px'
})

window.addEventListener('resize', () => {
  setSizes();
})
</script>

<template>
  <div 
    class="hovered-content"
    ref="tooltipParent">
      <slot/>
      <span 
        class="tooltip-text" 
        :class="direction" 
        ref="tooltipText"
        v-html="props.text"/>
  </div> 
</template>

<style scoped lang="scss">
.tooltip-text {
  visibility: hidden;
  position: fixed;
  color: var(--text-950);
  width: max-content;
  background-color: var(--background-800);
  border-radius: $borderRadius;
  padding: $padding;
  z-index: 10000000;
  text-align: center;
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
}

.tooltip-text::after {
  content: "";
  position: absolute;
  border-width: 8px;
  border-style: solid;
}

.up {
  top: calc(v-bind('parentXpos') - v-bind('tooltipHeight') - 8px);
  left: calc(v-bind('parentYpos') - v-bind('tooltipWidth') / 2 + v-bind('parentWidth') / 2);
}

.up::after {
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border-color: var(--background-800) transparent transparent transparent;
}

.down {
  top: calc(v-bind('parentXpos') + v-bind('tooltipHeight') + 4px);
  left: calc(v-bind('parentYpos') - v-bind('tooltipWidth') / 2 + v-bind('parentWidth') / 2);
}

.down::after {
  bottom: 100%;
  left: 50%;
  margin-left: -8px;
  border-color: transparent transparent var(--background-800) transparent;
}

.left {
  top: calc(v-bind('parentXpos') - (v-bind(tooltipHeight) - v-bind(parentHeight)) / 2);
  left: calc(v-bind('parentYpos') - v-bind(tooltipWidth) - 8px);
}

.left::after {
  left: 100%;
  top: 6px;
  border-color: transparent transparent transparent var(--background-800);
}

.right {
  top: calc(v-bind('parentXpos') - (v-bind(tooltipHeight) - v-bind(parentHeight)) / 2);
  left: calc(v-bind('parentYpos') + v-bind(parentWidth) + 8px);
}

.right::after {
  top: 50%;
  right: 100%;
  margin-top: -8px;
  border-color: transparent var(--background-800) transparent transparent;
}

.hovered-content {
  position: relative;
  display: flex;
  justify-content: center;
}

.hovered-content:hover .tooltip-text {
  display: block;
  visibility: visible;
}
</style>
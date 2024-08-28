<script lang="ts" setup>
interface Props {
  title: string,
  width?: string,
  height?: string
}
const props = withDefaults(
  defineProps<Props>(),
  { width: "auto", height: "auto" });
</script>

<template>
  <div class="form-wrapper">
    <div class="form-scroll-wrapper">
      <h2>{{ props.title }}</h2>
      <slot name="inputs" />
    </div>

    <div class="form-buttons-slot">
      <slot name="buttons" />
    </div>

  </div>
</template>

<style scoped lang="scss">
h2 {
  margin: 0;
  font-size: $large;
}

.form-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: $gap;
  justify-items: center;
  border-radius: $borderRadius;
  padding: $padding;
  background-color: var(--background-950);
  width: v-bind(width);
  max-height: v-bind(height);
  height: fit-content;
}

.form-buttons-slot {
  align-self: center;
  height: fit-content;
}
</style>
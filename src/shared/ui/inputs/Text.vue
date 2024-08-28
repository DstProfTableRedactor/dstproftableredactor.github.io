<script lang="ts" setup>
const props = defineProps(['text'])
const emit = defineEmits(['update:text'])

const value = computed({
  get() {
    return props.text
  },
  set(value) {
    emit('update:text', value)
  }
})
</script>

<template>
  <Inputs v-model:value="value" />
</template>
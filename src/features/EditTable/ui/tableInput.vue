<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps(['value'])
const emit = defineEmits<{
  (e: 'blur', value: string): void,
  (e: 'update:value', value: string): void
}>()

const computedValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    if (value === '')
      value = ' ';
    emit('update:value', value);
    textInput.value!.focus();
  },
});

const textInput = ref<HTMLInputElement>();

onMounted(() => {
  textInput.value!.focus();
  textInput.value?.setSelectionRange(0, textInput.value.value.length);
})
</script>

<template>
  <input
    ref="textInput"
    type="text"
    class="redacted"
    v-model="computedValue"
    @blur="$emit('blur', computedValue)"
    @keydown.enter="$emit('blur', computedValue)"/>
</template>
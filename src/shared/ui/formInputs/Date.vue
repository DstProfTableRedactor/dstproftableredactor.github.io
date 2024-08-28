<script lang="ts" setup>
interface Props {
  date: any,
  showAlert?: boolean,
  title?: string,
  includeTime?: boolean
}
const props = defineProps<Props>();
const emits = defineEmits([ 'update:date', 'update:showAlert' ]);

const showAlert = computed({
  get() {
    return props.showAlert
  },
  set(value) {
    emits("update:showAlert", value)
  }
});

const date = computed({
  get() {
    return props.date
  },
  set(value) {
    emits("update:date", value);
  }
});
</script>

<template>
  <FormInputBase :title="props.title" :show-alert="showAlert">
    <InputsDateTime
      v-if="props.includeTime"
      v-model:date="date" />
    <InputsDate
      v-else
      v-model:date="date" />
  </FormInputBase>
</template>

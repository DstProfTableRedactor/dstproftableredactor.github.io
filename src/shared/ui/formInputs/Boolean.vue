<script lang="ts" setup>
interface Props {
  boolean: any,
  id: string,
  inputTitle?: string,
  label: string,
}
const props = defineProps<Props>();
const emits = defineEmits([ 'update:boolean' ]);

const boolean = computed({
  get() {
    return props.boolean
  },
  set(value) {
    emits("update:boolean", value)
  }
});
</script>

<template>
  <FormInputsBase :title="props.inputTitle">
    <CheckboxItem
      :title="props.label"
      v-model:is-checked="boolean" 
      :id="props.id" />
  </FormInputsBase>
</template>

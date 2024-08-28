<script setup lang="ts">
export type SelectOption = {
  value: string,
  key: string,
}

interface Props {
  options: SelectOption[],
  value: any,
  disabled?: boolean,
}
const props = defineProps<Props>();
const emits = defineEmits([ 'update:value' ]);

const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits('update:value', value);
  }
});
</script>

<template>
<select
  class="select-input" 
  v-model="value"
  :disabled="props.disabled"
  @change="(event) => (event.target as HTMLSelectElement).blur()">
    <InputsSelectOption v-for="option in options"
      :option="option"/>
</select>
</template>

<style scoped lang="scss">
select {
  outline: none;
  font: 'TildaSans';
  font-size: 1em;
  border: 3px solid transparent;
  border-radius: $borderRadius;
  background-color: var(--background-900);
  padding: $padding;
  color: var(--text-950);
  min-width: 0px;
  width: 100%;  
  transition: all 100ms;
}

select:focus-within {
  border: 3px solid transparent;
  border-image-slice: 1;
  background-image: linear-gradient(var(--background-900), var(--background-900)), var(--linear-accent-400-600);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
}

select[disabled] {
  color: var(text-600);
  appearance: none;
}
</style>
<script lang="ts" setup>
interface Props {
  isChecked: boolean,
  title?: string,
  disabled?: boolean,
  id: string
}
const props = defineProps<Props>();
const emits = defineEmits(["update:isChecked"]);

const isChecked = computed({
  get() {
    return props.isChecked;
  },
  set(value) {
    emits("update:isChecked", value);
  }
});
</script>

<template>
  <div class="centered-checkbox">
    <input type="checkbox" :id="props.id" v-model="isChecked" :disabled="disabled"/>
    <label :for="props.id" :class="{ 'shifted': props.title }">{{ props.title }}</label>    
  </div>
</template>

<style scoped lang="scss">
input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

input + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  color: var(--text-950);
  font-size: $medium;
}

input + .shifted::before {
  margin-right: 0.5em;
}

input + label::before {
  content: '';
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid var(--background-400);
  border-radius: $borderRadius;
  transition: all 300ms ease;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
}

input:not(:checked) + label:hover::before {
  border-color: var(--accent-500);
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
}

input:checked + label::before {
  border-color: var(--accent-500);
  background-color: var(--accent-500);  
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.centered-checkbox {
  display: flex;
  align-items: center;
}

input[disabled] + label::before {
  opacity: 0.6;
  cursor: auto;
}
</style>
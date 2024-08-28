<script lang="ts" setup>
interface Props {
  allowFloat?: boolean,
  number: any
}
const props = defineProps<Props>();
const emit = defineEmits(['update:number']);

const number = computed({
  get() {
    return props.number;
  },
  set(value) {
    emit('update:number', Number(value));
  }
});

const handleInput = (event: KeyboardEvent) => {
  if (event.key === 'Backspace'
    || event.key === 'Delete'
    || event.key === 'ArrowLeft'
    || event.key === 'ArrowRight'
    || event.key === 'Tab') 
    return;

  if (!event.key.match(/^[0-9]$/)) {

    if (props.allowFloat && event.key.match(/^\.$/)) {
      let target = event.target as HTMLInputElement;

      if (target.value.length !== 0 && !target.value.includes('.'))
        return;
    }
    
    event.preventDefault();
  }
};
</script>

<template>
  <Inputs
    @keydown="handleInput" 
    v-model:value="number"
    maxlength="9" />
</template>

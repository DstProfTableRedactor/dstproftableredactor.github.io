<script setup lang="ts">
interface Props {
  value: any, 
  showAlert?: boolean,
  required?: boolean,
  alertText?: string,
  title?: string,
  placeholder?: string,
  tooltipDirection?: 'up' | 'left' | 'down' | 'right',
  allowFloat?: boolean,
}
const props = withDefaults(defineProps<Props>(), {tooltipDirection: 'up'});
const emits = defineEmits([ 'update:value', 'update:showAlert', 'update:alertText' ]);

const showAlert = computed({
  get() {
    return props.showAlert
  },
  set(value) {
    emits("update:showAlert", value)
  }
});

const alertText = computed({
  get() {
    return props.alertText
  },
  set(value) {
    emits("update:alertText", value)
  }
});

const value = computed({
  get() {
    return props.value
  },
  set(value) {
    emits("update:value", Number(value));
  }
});

const handleInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (props.required && target.value.length === 0) {
    showAlert.value = true;
    alertText.value = 'Обязательное поле'
  }
  if (showAlert.value !== undefined) {
    const target = event.target as HTMLInputElement;
    showAlert.value = !target.value;
  }
}
</script>

<template>
  <FormInputsBase :title="props.title" :show-alert="showAlert" :alert-text="alertText" :tooltip-direction="props.tooltipDirection">
    <InputsNumber 
      class="number-input"  
      v-model:number="value" 
      @input="handleInput" 
      :placeholder="props.placeholder"
      :allow-float="props.allowFloat"/>
  </FormInputsBase>
</template>

<style scoped lang="scss">

</style>
<script lang="ts" setup>
interface Props {
  text: any,
  required: boolean,
  showAlert?: boolean,
  alertText?: string,
  title?: string,
  placeholder?: string
  tooltipDirection?: 'up' | 'left' | 'down' | 'right',
}
const props = withDefaults(defineProps<Props>(), {tooltipDirection: 'up'});
const emits = defineEmits([ 'update:text', 'update:showAlert', 'update:alertText' ]);

const showAlert = computed({
  get() {
    return props.showAlert
  },
  set(value) {
    emits("update:showAlert", value)
  }
});

const text = computed({
  get() {
    return props.text
  },
  set(value) {
    emits("update:text", value)
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

const handleInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  showAlert.value = !target.value && props.required;
  
  if (showAlert.value) {
    alertText.value = "Обязательное поле";
  }
}
</script>

<template>
  <FormInputsBase 
    :title="props.title" 
    :show-alert="showAlert" 
    :alert-text="alertText" 
    class="form-input-base-textarea" 
    :tooltip-direction="props.tooltipDirection"
    :height="''">
      <InputsTextArea  
        class="text-input" 
        v-model:text="text" 
        @input="handleInput" 
        :placeholder="props.placeholder" />
  </FormInputsBase>
</template>

<style scoped lang="scss">
.text-input {
  flex: 1;
}

</style>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['date']);
const emit = defineEmits(['update:date']);

const value = computed({
  get() {
    return props.date
  },
  set(value) {
    emit('update:date', value)
  }
});

onMounted(() => {
  if (props.date) {
    const date = new Date(props.date);
    value.value = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, -5);
  }
});
</script>

<template>
  <div>
    <input type="datetime-local" v-model="value" />
  </div>
</template>

<style scoped lang="scss">
*, 
*:before,
*:after{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

input[type="datetime-local"]{
  border: none;
  outline: none;
  background-color: rgb(var(--primary-500));
  color: white;
  border-radius: $borderRadius;  
  font-family: "TildaSans";
  padding: $padding;
  font-size: 1.2rem;
}

::-webkit-calendar-picker-indicator{
  background-color: transparent;
  cursor: pointer;
  filter: invert(100%);
}
</style>
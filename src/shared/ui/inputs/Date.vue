<script lang="ts" setup>
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
  if (props.date)
    value.value = props.date.split('T')[0]
});

onUpdated(() => {
  if (props.date)
    value.value = props.date.split('T')[0]
});
</script>

<template>
  <div>
    <input type="date" v-model="value" />
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

input[type="date"]{
  border: none;
  outline: none;
  height: 2em;
  font-size: $medium;
  background-color: var(--accent-500);
  color: var(--text-950);
  border-radius: $borderRadius;  
  font-family: "TildaSans";
  padding-left: 3px;
}

::-webkit-calendar-picker-indicator{
  background-color: var(--text-950);
  cursor: pointer;
  border-radius: $borderRadius;
}
</style>
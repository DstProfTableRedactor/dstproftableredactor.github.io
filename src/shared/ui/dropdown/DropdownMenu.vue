<script setup lang="ts">
const emits = defineEmits([ 'close' ]);
const dropdown = ref<HTMLUListElement>()

onMounted(() => {
  dropdown.value!.focus()
});
</script>

<template>
    <ul 
      class="dropdown-options-list"
      tabindex="1"
      ref="dropdown"
      @blur="emits('close')">
      <slot/>
    </ul>
</template>

<style scoped lang="scss">
.dropdown-options-list {
  list-style-type: none;
  padding: 0.5em;
  margin: 0;
  background-color: var(--background-900);
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-background-600-50);
  border-radius: $borderRadius * 2;
}
</style>
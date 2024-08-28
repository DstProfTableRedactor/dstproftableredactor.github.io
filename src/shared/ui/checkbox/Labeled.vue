<script lang="ts" setup>
interface Props {
  value: boolean,
  id: string
}
const props = defineProps<Props>();
const emits = defineEmits(["update:value"]);

const value = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits("update:value", value);
  }
});
</script>

<template>
  <div class="centered-checkbox">
    <input type="checkbox" :id="props.id" v-model="value"/>
    <div class="false-label" :class="{ 'checked': !value }">
      <label :for="props.id" class="noselect">
        <slot name="false"/>
      </label>
    </div>
   
    <div class="true-label" :class="{ 'checked': value }">
      <label :for="props.id" class="noselect">
        <slot name="true"/>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checked {
  background-color: var(--accent-500);
}

input {
  display: none
}

.centered-checkbox {  
  display: flex;
  align-items: center;
  border-radius: $borderRadius;
  background-color: var(--background-900);
}

.centered-checkbox div {
  height: 100%;
  width: calc(50% + 2px);
  display: flex;
  white-space: nowrap;
  align-items: center;
}

label {
  display: inline-block;
  overflow: hidden; 
  text-overflow: ellipsis;
  padding: $padding;
}

.false-label {
  border-radius: $borderRadius 0 0 $borderRadius;
  clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0% 100%);
}

.true-label {
  margin-left: -4px;
  clip-path: polygon(4px 0, 100% 0, 100% 100%, 0% 100%);
  border-radius: 0 $borderRadius $borderRadius 0;
}
</style>
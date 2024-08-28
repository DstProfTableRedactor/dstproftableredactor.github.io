<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['value'])
const emit = defineEmits(['update:value'])

//TODO: Rewrite all to v-model
const computedValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  },
});
</script>

<template>  
    <div class="text-wrapper">
        <textarea 
            v-model="computedValue" />
    </div>
</template>

<style scoped>
.text-wrapper {
    width: 100%;
}

textarea {
  width: 500px;
  height: 100%;
  text-align: start;
  text-justify: start;
}
</style>
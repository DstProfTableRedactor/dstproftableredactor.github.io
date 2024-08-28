<script setup lang="ts">
interface Props {
    value: any;
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
    <input v-model="value" />
</template>

<style scoped lang="scss">
input {
    outline: none;
    font-size: $medium;
    font-family: 'TildaSans';
    border: 0 solid transparent;
    border-radius: $borderRadius;
    background-color: var(--background-900);
    padding: 0.5em;
    color: var(--text-950);
    min-width: 0px;
    height: max-content;
    width: 100%;
    transition: all 100ms;
}

input:focus {
    border: 3px solid transparent;
    border-image-slice: 1;
    background-image: linear-gradient(var(--background-900), var(--background-900)), var(--linear-accent-400-600);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
    -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
    box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
}

::placeholder {
    color: var(--text-950);
    opacity: 0.7;
}
</style>
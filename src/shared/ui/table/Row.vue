<script lang='ts' setup>
interface Props {
    disabled?: boolean
}
const props = defineProps<Props>();
</script>

<template>
	<tr :class="{ 'disabled': props.disabled }">
		<slot name="columns" />
	</tr>
</template>

<style lang='scss'>
tr:hover:not(.disabled):not(:has(th)) {
	transition: background-color 100ms ease-out;
	background-color: var(--background-900);	
	cursor: pointer;
}

.disabled {
	background-color: var(--background-900);
	cursor: default;
}

.disabled * {
	opacity: 0.3;
}

td {
	text-wrap: nowrap;
}
</style>
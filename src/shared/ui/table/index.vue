<script lang='ts' setup>
</script>

<template>
  <table class="characteristics-table">
    <thead>
      <slot name="header" />
    </thead>

    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>

<style lang='scss'>

.characteristics-table {
	border-top: 1px solid var(--background-700);
	border-bottom: 1px solid var(--background-700);
	border-collapse: collapse;
	color: var(--text-950);
	font-size: $moreThanMedium;
  width: 100%;
}

td, th {
	padding: $padding;
	border-top: 1px solid var(--background-700);
}

td:not(:last-child), th:not(:last-child) {
	border-right: 1px solid var(--background-700);
}
</style>
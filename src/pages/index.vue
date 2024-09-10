<script setup lang=ts>
import { TableRedactor } from '~/widgets/TableRedactor';

useHead({
    title: 'Редактор таблиц',
})
</script>

<template>
    <div class="page-wrapper">
        <TableRedactor />
    </div>
</template>

<style scoped lang="scss">
.page-wrapper {
    width: 100%;
    padding: $padding;
}
</style>
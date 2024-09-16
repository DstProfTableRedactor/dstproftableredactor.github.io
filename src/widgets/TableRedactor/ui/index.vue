<script setup lang="ts">
import type { ButtonFilled } from '#build/components';
import { initialTable } from '~/app/assets/initial_table.html';
import { MaintenanceTable } from '~/entity/Table';
import { TableTextarea } from '~/features/EditTable';
import { useEditStore } from '~/shared/stores/edit';
import { EditMode } from '~/shared/types/editmode';
import type { TableCell } from '~/shared/types/table';

const hmtlText = ref<string>(initialTable);

const store = useEditStore();

const replaceAt = function(value: string, startIndex: number, endIndex: number, replacement: string) {
  console.log(replacement)
  return value.substring(0, startIndex) + replacement + value.substring(endIndex + 1);
}

const handleCellClick = (cell: TableCell) => {
  if (store.editMode === EditMode.Paint) {
    hmtlText.value = replaceAt(hmtlText.value, cell.dataStart + 2, cell.dataStart + 2, hmtlText.value[cell.dataStart + 2] === 'd' ? 'h' : 'd');
    hmtlText.value = replaceAt(hmtlText.value, cell.dataStart + 8, cell.dataStart + 8, hmtlText.value[cell.dataStart + 8] === 'd' ? 'h' : 'd');
    return;
  }
}

const handleTextReplace = (cell: TableCell) => {
  console.log('handleTextReplace', cell)
  console.log('length', cell.dataEnd - cell.dataStart)
  console.log('dataStart', hmtlText.value.substring(cell.dataStart + 4, cell.dataStart + 5))
  console.log('datalength', hmtlText.value.substring(cell.dataStart + 4, cell.dataEnd + 5).split('<')[0])
  const dataLength = hmtlText.value.substring(cell.dataStart + 4, cell.dataEnd + 5).split('<')[0].length
  console.log('dataEnd', hmtlText.value.substring(dataLength, dataLength + 1))
  console.log('dataString', cell.data)

  hmtlText.value = replaceAt(hmtlText.value, cell.dataStart + 4, cell.dataStart + 3 + dataLength, cell.data);
}
</script>

<template>
  <div class="redactor-wrapper">
  <MaintenanceTable
    :tableHtml="hmtlText"
    :editMode="store.editMode"
    @cellClick="handleCellClick"
    @symbolReplace="handleTextReplace" />
  <div></div>
  <TableTextarea
    :value="hmtlText"
    @update:value="($event: any) => (hmtlText = $event)"
    @loadInitialTable="() => (hmtlText = initialTable)" />
  </div>
</template>

<style scoped lang="scss">
.redactor-wrapper {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 0.5em;
  gap: 2em;


}
</style>
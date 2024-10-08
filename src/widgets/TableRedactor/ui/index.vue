<script setup lang="ts">
import type { ButtonFilled } from '#build/components';
import { initialTable } from '~/app/assets/initial_table.html';
import { MaintenanceTable } from '~/entity/Table';
import { TableTextarea } from '~/features/EditTable';
import { useEditStore } from '~/shared/stores/edit';
import { EditMode } from '~/shared/types/editmode';
import type { TableCell } from '~/shared/types/table';

const htmlText = ref<string>(initialTable);

const store = useEditStore();

const replaceAt = function(value: string, startIndex: number, endIndex: number, replacement: string) {
  return value.substring(0, startIndex) + replacement + value.substring(endIndex + 1);
}

const handleCellClick = (cell: TableCell) => {
  if (store.editMode === EditMode.Paint) {
    htmlText.value = replaceAt(htmlText.value, cell.dataStart + 2, cell.dataStart + 2, htmlText.value[cell.dataStart + 2] === 'd' ? 'h' : 'd');
    htmlText.value = replaceAt(htmlText.value, cell.dataStart + cell.data.length + 7, cell.dataStart + cell.data.length + 7, htmlText.value[cell.dataStart + cell.data.length + 7] === 'd' ? 'h' : 'd');
    return;
  }
}

const handleTextReplace = (cell: TableCell) => {
  const dataLength = htmlText.value.substring(cell.dataStart + 4, cell.dataEnd + 5).split('<')[0].length

  htmlText.value = replaceAt(htmlText.value, cell.dataStart + 4, cell.dataStart + 3 + dataLength, cell.data);
}

const handleColumnAdd = (columnsCount: number, rowCount: number) => {
  const tableHeaderLength = htmlText.value.match(/.*?(?=<\/tr>)/s)![0].length + 5;
  htmlText.value = htmlText.value.slice(0, tableHeaderLength + 10).replaceAll(/<\/tr>/g, `  <th> </th>\n    </tr>`) + htmlText.value.slice(tableHeaderLength + 10).replaceAll(/<\/tr>/g, `  <td> </td>\n    </tr>`)
}

const handleRowAdd = (columnsCount: number, rowCount: number) => {
  const upToLastRow = htmlText.value.match(/^[\s\S]*<\/tr>/)![0];
  htmlText.value = replaceAt(htmlText.value, upToLastRow.length, upToLastRow.length, `\n    <tr>\n      <th>${rowCount + 1}</th>\n${'      <td> </td>\n'.repeat(columnsCount - 1)}    </tr>\n`);
}
</script>

<template>
  <div class="redactor-wrapper">
  <MaintenanceTable
    :tableHtml="htmlText"
    :editMode="store.editMode"
    @cellClick="handleCellClick"
    @symbolReplace="handleTextReplace"
    @add-column="handleColumnAdd"
    @add-row="handleRowAdd" />
  <div></div>
  <TableTextarea
    :value="htmlText"
    @update:value="($event: any) => (htmlText = $event)"
    @loadInitialTable="() => (htmlText = initialTable)" />
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
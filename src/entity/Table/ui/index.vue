<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { TableBody, TableRow, TableCell } from '~/shared/types/table';
import { EditMode } from '~/shared/types/editmode';
import { TableInput } from '~/features/EditTable'; //FIXME: Not FSD, rewrite to use slot passed from widget
import { useEditStore } from '~/shared/stores/edit';

const props = defineProps<{
  tableHtml: string,
}>()

const emit = defineEmits<{
  (e: 'cellClick', value: TableCell): void,
  (e: 'symbolReplace', cell: TableCell): void
}>()

const store = useEditStore();

const tableHeader = ref<string>(''); 

const tableBody = ref<TableBody>({
  columsCount: 0,
  rows: [],
  rowsCount: 0,
  dataStart: 0,
  dataEnd: 0,
})

const afterTable = ref<string>('')

onMounted(() => {
  //console.log('props.tableHtml', props.tableHtml);
  constructTableBody();
})

watch(() => props.tableHtml, () => {
  constructTableBody();
})

const getStartEnd = (str: string, sub: string) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1];

const constructTableBody = () => {
  tableBody.value = {
    columsCount: 0,
    rows: [],
    rowsCount: 0,
    dataStart: 0,
    dataEnd: 0,
  }
  tableHeader.value = props.tableHtml.match(/<thead>([\s\S]*)<\/thead>/i)?.[0].slice(7, -8) ?? '';
  const tableBodyString = props.tableHtml.match(/<tbody>([\s\S]*)<\/tbody>/i)?.[0] ?? '';
  const tableBodyStartEnd = getStartEnd(props.tableHtml,tableBodyString);
  tableBody.value.dataStart = tableBodyStartEnd[0];
  tableBody.value.dataEnd = tableBodyStartEnd[1];
  const tableRows = tableBodyString
    .split(/<tr>|<\/tr>/)
    .filter(row => row !== '')
    .map((row, index) => {
      return {
        index,
        0: `<tr>${row}</tr>`
      }
    })

    let rowIndex = 0;

  for (const row of tableRows) {
    const tableRowStartEnd = getStartEnd(tableBodyString, row[0]);
    const tableRow: TableRow = {
      columns: [],
      index: rowIndex,
      dataStart: tableRowStartEnd[0] + tableBody.value.dataStart,
      dataEnd: tableRowStartEnd[1] + tableBody.value.dataStart,
    }

    rowIndex++;

    const thTdElements = row[0].matchAll(/<(th|td).*?>([\s\S]*?)<\/(th|td)>/g) || []

    let columnIndex = 0;

    for (const thtd of thTdElements) {
      tableRow.columns.push({
        dataStart: thtd.index + tableRow.dataStart,
        dataEnd: thtd.index + thtd[0].length + tableRow.dataStart,
        data: thtd[0].slice(4, -5),
        bold: false,
        gray: thtd[0].startsWith('<th>'),
        index: columnIndex
      } as TableCell);
      // console.log({
      //   dataStart: thtd.index + tableRow.dataStart,
      //   dataEnd: thtd.index + thtd[0].length + tableRow.dataStart,
      //   data: thtd[0].slice(4, -5),
      //   bold: false,
      //   gray: thtd[0].startsWith('<th>'),
      //   index: columnIndex
      // })
      columnIndex++;
    }

    if (tableRow.columns.length > 0) {
      tableBody.value.rows.push(tableRow);
    }

    afterTable.value = props.tableHtml.slice(tableBody.value.dataEnd).replace(/[\s\S]*?<\/table>/, '');
  }
}

const handleCellClick = (event: MouseEvent, cell: TableCell) => {
  if (store.editMode === EditMode.Default) {
    return;
  }
  
  if (store.editMode === EditMode.Paint) {
    emit('cellClick', cell);
  }

  if (store.editMode === EditMode.Type) {
    redactedCellWidth.value = (event.target! as HTMLElement).clientWidth + 'px';
    redactedCell.value = cell;
  }
}

const redactedCell = ref<TableCell>();
const redactedCellWidth = ref<string>('100%');

const handleCellUpdate = (value: string, cell: TableCell) => {
  cell.data = value
  // const initialCellValue = cell.data;
  // cell.data = value;
  
  // emit('symbolReplace', cell);
}

const handleBlur = (value: string, cell: TableCell) => {
  cell.data = value;
  redactedCell.value = undefined;
  redactedCellWidth.value = '100%';
  emit('symbolReplace', cell);
}
</script>

<template>
  <div class="maintenance-table-wrapper">
    <table
      class="table">
      <thead v-html="tableHeader" />
      <tbody style="display: table-row-group">
        <tr 
          class="row-wrapper"
          v-for="row in tableBody.rows">
            <template v-for="cell in row.columns">
              <TableInput 
                v-if="cell === redactedCell"
                :value="cell.data"
                @update:value="handleCellUpdate($event, cell)"
                @blur="handleBlur($event, cell)" />
              <td 
                v-else-if="!cell.gray"
                @click="handleCellClick($event, cell)"
                class="cell">
                {{ cell.data }}
              </td>
              <th 
                @click="handleCellClick($event, cell)"
                class="cell"
                :class="{'redacted': cell === redactedCell}"
                v-else>
                {{ cell.data }}
              </th>
            </template>
        </tr>
      </tbody>
    </table>
    <div class="after-table" v-html="afterTable" />
  </div>
</template>

<style scoped lang="scss">
.maintenance-table-wrapper {
  width: fit-content !important;
  max-width: 100%;
  align-self: center;
}

.table {
  border-collapse: collapse;

  .redacted {
    background-color: var(--text-200);
    flex: 1;
    width: v-bind(redactedCellWidth);
    box-sizing: border-box;
  }

  h3 {
    text-align: center;
    width: 100%;
  }

  b {
    font-weight: 600;
  }

  table {
    display: inline-block;
    align-self: center;
    overflow-y: hidden;
    overflow-x: auto;
    max-width: 100%;
    text-align: center;
    border-collapse: collapse;
  }

  th,
  td,
  .cell,
  input,
  thead > tr > th {
    padding: 5px 5px;
    border: 1px solid var(--text-900);
    border-collapse: collapse;
    color: var(--text-900);
    font-size: var(--medium);
    font-weight: 500;
    text-align: center;
  }

  thead {
    tr:nth-of-type(1) {
      background-color: #d8d8d8;
    }
  }

  input {
    width: 34px;
  }

  tbody > tr > td:first-of-type {
    text-align: left !important;
  }

  h5 {
    margin: $padding * 2;
    text-align: right;
  }

  th {
    background-color: #d8d8d8;
  }
}

thead::v-deep(th) {
  padding: 5px 5px;
  border: 1px solid var(--text-900);
  border-collapse: collapse;
  color: var(--text-900);
  font-size: var(--medium);
  font-weight: 500;
  text-align: center;
  background-color: #d8d8d8;

}

thead::v-deep(td) {
  padding: 5px 5px;
  border: 1px solid var(--text-900);
  border-collapse: collapse;
  color: var(--text-900);
  font-size: var(--medium);
  font-weight: 500;
  text-align: center;
}

.after-table::v-deep(h5) {
      margin: $padding * 2;
      text-align: right;
      font-weight: 500;
}

</style>
<script setup lang="ts">
import { EditMode } from '~/shared/types/editmode';

const editMode = defineModel<EditMode>('editMode', { required: true });

const toggleTypeMode = () => {
  editMode.value = editMode.value === EditMode.Type ? EditMode.Default : EditMode.Type
}

const togglePaintMode = () => {
  editMode.value = editMode.value === EditMode.Paint ? EditMode.Default : EditMode.Paint
}
</script>

<template>
<div class="modes-wrapper">
  <div
    class="button"
    :class="editMode === EditMode.Type ? 'active' : ''"
    @click="toggleTypeMode">
    Текстовый ввод
  </div>
  <div
    class="button"
    :class="editMode === EditMode.Paint ? 'active' : ''"
    @click="togglePaintMode">
    Покраска
  </div>
</div>
</template>

<style scoped lang="scss">
.modes-wrapper {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  gap: 2em;

  .button {
    color: var(--text-50);
    display: flex;
    box-sizing: border-box;
    height: 50px;
    width: fit-content;
    padding: 1em;
    background-color: #364758;
    align-items: center;

    &:hover {
      cursor: pointer;
      filter: brightness(110%);
    }

    &.active {
      filter: brightness(90%)
    }
  }
}
</style>
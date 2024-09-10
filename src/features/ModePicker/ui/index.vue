<script setup lang="ts">
import { useEditStore } from '~/shared/stores/edit';
import { EditMode } from '~/shared/types/editmode';

const store = useEditStore();

const toggleTypeMode = () => {
  store.editMode = store.editMode === EditMode.Type ? EditMode.Default : EditMode.Type
}

const togglePaintMode = () => {
  store.editMode = store.editMode === EditMode.Paint ? EditMode.Default : EditMode.Paint
}
</script>

<template>
<div class="modes-wrapper">
  <ButtonFilled
    class="button"
    :class="store.editMode === EditMode.Type ? 'active' : ''"
    @click="toggleTypeMode">
    Текстовый ввод
  </ButtonFilled>
  <ButtonFilled
    class="button"
    :class="store.editMode === EditMode.Paint ? 'active' : ''"
    @click="togglePaintMode">
    Покраска
  </ButtonFilled>
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
    display: flex;
    box-sizing: border-box;
    width: fit-content;
    padding: 0.5em;
    align-items: center;

    &:hover {
      cursor: pointer;
      filter: brightness(105%);
    }

    &.active {
      filter: brightness(90%)
    }
  }
}
</style>
import { defineStore } from 'pinia'
import { EditMode } from '../types/editmode';

export const useEditStore = defineStore('edit', () => {
  const editMode = ref<EditMode>(EditMode.Default);

  return {
    editMode
  }
})
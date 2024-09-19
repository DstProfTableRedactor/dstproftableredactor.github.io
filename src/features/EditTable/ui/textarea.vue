<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useNotificationsStore } from '~/shared/stores/notifications';

const props = defineProps(['value'])
const emit = defineEmits(['update:value', 'loadInitialTable'])

const notificationsStore = useNotificationsStore();

//TODO: Rewrite all to v-model
const computedValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  },
});

const handleCopy = () => {
  navigator.clipboard.writeText(computedValue.value);
  notificationsStore.addSuccessNotification('Текст скопирован в буфер обмена');
}
</script>

<template>  
  <div class="text-wrapper">
    <div>
      <ButtonFilled @click="emit('loadInitialTable')">
        Загрузить дефолтную таблицу
      </ButtonFilled>
    </div>
    <article>
      Теги перед таблицей не менять, от них стилизация текста над таблицей зависит, только содержимое.
      Заголовок таблицы редактируется только из текстового поля, покраска клеток под "Наименование материала" ломает выравнивание (в строке должна быть хотя бы одна непокрашенная клетка, чтобы после нее выравнивалось по центру). небагофича. 
      <br>"* - Замена по необходимости" тоже редактируется из текстового поля, если там что-то менять, то тег h5 надо оставить.
    </article>
    <textarea 
      v-model="computedValue" />
    <div>
      <ButtonFilled @click="handleCopy">
        <Icon icon="mage:copy"></Icon>Скопировать в буфер обмена
      </ButtonFilled>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: $gap
}

textarea {
  width: 100%;
  height: 100%;
  text-align: start;
  text-justify: start;
}
</style>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useNotificationsStore } from '~/shared/stores/notifications';

const props = defineProps(['value'])
const emit = defineEmits(['update:value'])

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
    <article>
      Заголовок таблицы редактируется только из текстового поля, покраска клетки под "Наименование материала" ломает выравнивание. небагофича. Покраска клеток с текстом длиной больше 1 ломает вообще все. Баг
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
<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['text'])
const emit = defineEmits(['update:text'])

const textArea = ref<HTMLInputElement>();

const text = computed({
  get() {
    return props.text
  },
  set(value) {
    const fontSize = parseFloat(getComputedStyle(textArea.value!).fontSize);
    textArea.value!.style.height = Math.ceil(textArea.value!.scrollHeight / fontSize) + 'em'
    emit('update:text', value)
  }
})

const isOverflowing = computed(() => {
  if(textArea.value == null) {
    return;
  }
  //NOTE: Может когда-то сделаем. Но я ебал, ни компьютед не срабатывает на изменение размера мышкой, ни какие-либо эвенты не файрятся. пиздес бля вебдев, хоть по таймеру каждые полсекунды чекай
  return textArea.value!.scrollHeight > textArea.value!.clientHeight;
})

const handleTabPress = (e: KeyboardEvent) => {
  e.preventDefault();
  let start = textArea.value!.selectionStart!;
  text.value = 
    text.value.slice(0, start) + 
    '\t' + 
    text.value.slice(textArea.value!.selectionEnd!);
  setTimeout(() => textArea.value!.setSelectionRange(start + 1, start + 1));
  textArea.value!.focus();
}
</script>

<template>
  <textarea
    v-bind="$attrs"
    v-model="text"
    ref="textArea"
    spellcheck="false"
    :class="{'overflown': isOverflowing}"
    @keydown.tab.prevent="handleTabPress"
  />
</template>

<style scoped lang="scss">
.overflown {
  border-bottom: 2px solid var(--accent-500);
}

textarea {
  font-size: $medium;
  font-family: 'TildaSans';
  border: 3px solid transparent;
  outline: none;
  resize: vertical;
  border-radius: $borderRadius;
  background-color: var(--background-900);
  color: var(--text-950);
  transition: background-image, box-shadow 100ms ease;
  min-width: 0px;
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  min-height: 1.7em; 
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}

.textarea::-webkit-scrollbar {
  display: none;
}

textarea:focus {
  border: 3px solid transparent;
  border-image-slice: 1;
  background-image: linear-gradient(var(--background-900), var(--background-900)), var(--linear-accent-400-600);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  -webkit-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  -moz-box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
  box-shadow: 0px 0px 5px 1px var(--transparent-accent-500-50);
}
</style>
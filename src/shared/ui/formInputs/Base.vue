<script setup lang="ts">
interface Props {
  showAlert?: boolean,
  alertText?: string,
  title?: string,
  isSpecified?: boolean,
  isSpecifiedId?: string,
  tooltipDirection?: 'up' | 'left' | 'down' | 'right',
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  isSpecified: undefined,
  tooltipDirection: 'up',
  alertText: '',
  height: '2.5em'
});
const emits = defineEmits([ 'update:isSpecified' ]);

const isSpecified = computed({
  get() {
    return props.isSpecified;
  },
  set(value) {
    emits('update:isSpecified', value);
  }
});
</script>

<template>
  <div class="form-input-wrapper">
    <div class="form-input-title-box" v-if="props.title || isSpecified !== undefined">
      <label class="form-input-label">
        {{ props.title }}
      </label>
      <CheckboxItem
        v-if="isSpecified !== undefined && props.isSpecifiedId" 
        v-model:is-checked="isSpecified"  
        :id="props.isSpecifiedId"/>
    </div>
    <div class="form-input-restriction-box">
      <slot/>
      <Tooltip v-if="props.showAlert" :text="props.alertText" class="form-input-tooltip" :direction="tooltipDirection">
        <IconAlert/>
      </Tooltip>
    </div> 
  </div>

</template>

<style scoped lang='scss'>
.form-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $gap;
}

.form-input-restriction-box {
  height: v-bind(height);
  display: flex;
  align-items: center;
  gap: $gap;
}

.form-input-label {
  color: var(--text-950);
  white-space: nowrap;
  font-size: $medium;
}

.form-input-tooltip {
  align-self: center;
}
</style>
<script setup lang="ts">
interface Props {
    saveTitle?: string,
    saveLoading?: boolean,
    saveDisabled?: boolean,
    cancelTitle?: string
    cancelLoading?: boolean,
    cancelDisabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    saveTitle: 'Сохранить',
    cancelTitle: 'Отменить',
});
const emits = defineEmits(['save', 'cancel'])
</script>

<template>
    <div class="button-container">
        <ButtonFilled
            :is-loading="props.saveLoading"
            :disabled="props.saveDisabled"
            class="form-button"
            @click="emits('save')">
            {{ props.saveTitle }}
        </ButtonFilled>
        <ButtonReject
            :is-loading="props.cancelLoading"
            :disabled="props.cancelDisabled"
            class="form-button"
            @click="emits('cancel')">
            {{ props.cancelTitle }}
        </ButtonReject>
    </div>
</template>

<style scoped lang="scss">
.button-container {
    display: flex;
    gap: $gap;
}

.form-button {
    width: 10em;
}
</style>
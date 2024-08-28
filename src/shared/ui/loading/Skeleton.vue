<template>
    <div class="skeleton-loading">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.skeleton-loading {
    border-radius: $borderRadius;
    background: var(--loading-900-950);
    background-size: 200% 100%;
    animation: 0.9s shine linear infinite;
}

.skeleton-loading:deep(*) {
    visibility: hidden;
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
</style>
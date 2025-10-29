<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
}>()
</script>

<template>
    <div class="app-header">
        <div class="header-content">
            <div class="title-section">
                <span class="title">{{ title }}</span>
                <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
            </div>

            <slot name="pdf-nav"></slot>

            <slot name="pdf-zoom"></slot>
        </div>
    </div>
</template>

<style scoped>
.app-header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
    padding: 0.75rem 2rem;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
}

.title-section {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 1rem;
}

.title {
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.subtitle {
    font-size: 0.875rem;
    color: #666;
    white-space: nowrap;
    flex-shrink: 0;
}
</style>

<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
}>()

const menuItems = [
    [
        {
            label: 'Dictionary',
            icon: 'i-lucide-book-open',
            to: '/',
        },
        {
            label: 'Library',
            icon: 'i-lucide-library',
            to: '/library',
        },
    ],
]
</script>

<template>
    <div class="app-header">
        <div class="header-content">
            <UDropdownMenu :items="menuItems">
                <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
            </UDropdownMenu>

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
    position: sticky;
    top: 0;
    z-index: 40;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.03);
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

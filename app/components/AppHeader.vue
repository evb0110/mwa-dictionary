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
    <header class="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors">
        <div class="flex items-center justify-between gap-8 px-8 py-3">
            <UDropdownMenu :items="menuItems">
                <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
            </UDropdownMenu>

            <div class="flex-1 min-w-0 flex items-baseline gap-4">
                <h1 class="text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-gray-900 dark:text-white">
                    {{ title }}
                </h1>
                <span v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">{{ subtitle }}</span>
            </div>

            <slot name="pdf-nav"></slot>

            <slot name="pdf-zoom"></slot>
        </div>
    </header>
</template>

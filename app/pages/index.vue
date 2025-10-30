<script setup lang="ts">
import { computed } from 'vue'
import { useSimpleDictStore } from '@/stores/simpleDict'

const simpleDictStore = useSimpleDictStore()

const requestSignature = computed(() => {
    const dicts = [...simpleDictStore.chosenDictionaries].sort().join(',')
    return `${simpleDictStore.searcherString || ''}::${simpleDictStore.searchScope}::${dicts}`
})

const { data: serverResults } = await useAsyncData('dict-search', () =>
    $fetch('/api/dictionary/search', {
        query: {
            q: simpleDictStore.searcherString || '',
            scope: simpleDictStore.searchScope,
            dict: simpleDictStore.chosenDictionaries,
        },
    }),
{
    watch: [
        requestSignature,
        () => simpleDictStore.searchTick,
    ],
},
)

const matchingDictLinesArr = computed(() => {
    const all = serverResults.value || []
    return all
        .filter(({ key }: { key: string }) => simpleDictStore.chosenDictionaries.includes(key))
        .filter((dict: { lines: unknown[] }) => Array.isArray(dict.lines) && dict.lines.length > 0)
})
</script>

<template>
    <div class="flex flex-col h-screen">
        <AppHeader
            title="Modern Western Aramaic Dictionary"
        />

        <div class="flex-1 overflow-y-auto p-8" style="scrollbar-gutter: stable;">
            <div class="max-w-6xl mx-auto mb-8 w-full">
                <DictSearcher />
            </div>

            <div v-if="matchingDictLinesArr.length > 0" class="max-w-6xl mx-auto w-full flex flex-col gap-8">
                <div v-for="dict in matchingDictLinesArr" :key="dict.key" class="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors">
                    <div class="flex items-center gap-4 mb-6">
                        <h2 class="text-2xl font-semibold m-0 text-gray-900 dark:text-white">{{ dict.title }}</h2>
                        <UBadge v-if="dict.lines.length" color="neutral" variant="subtle">
                            {{ dict.lines.length }} result{{ dict.lines.length !== 1 ? 's' : '' }}
                        </UBadge>
                    </div>
                    <SearchResults
                        v-if="dict.lines.length"
                        :lines-matching="dict.lines"
                        :searcher="simpleDictStore.searcher"
                        :scope="simpleDictStore.searchScope"
                        :dict-key="dict.key"
                    />
                </div>
            </div>

            <div v-else-if="simpleDictStore.searcherString" class="flex flex-col items-center justify-center p-16 text-center text-gray-500 dark:text-gray-400">
                <UIcon name="i-lucide-search-x" class="text-6xl mb-4 opacity-50" />
                <p class="text-lg">No results found for "{{ simpleDictStore.searcherString }}"</p>
            </div>

            <div v-else class="flex flex-col items-center justify-center p-16 text-center text-gray-500 dark:text-gray-400">
                <UIcon name="i-lucide-book-open" class="text-6xl mb-4 opacity-50" />
                <p class="text-lg">Enter a search term to find entries in the dictionary</p>
            </div>
        </div>
    </div>
</template>

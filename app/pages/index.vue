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
}
)

const matchingDictLinesArr = computed(() => {
    const all = serverResults.value || []
    return all
        .filter(({ key }: { key: string }) => simpleDictStore.chosenDictionaries.includes(key))
        .filter((dict: { lines: unknown[] }) => Array.isArray(dict.lines) && dict.lines.length > 0)
})
</script>

<template>
    <div class="dictionary-page">
        <AppHeader
            title="Modern Western Aramaic Dictionary"
        />

        <div class="content-wrapper">
            <div class="search-section">
                <DictSearcher />
            </div>

            <div v-if="matchingDictLinesArr.length > 0" class="results-section">
                <div v-for="dict in matchingDictLinesArr" :key="dict.key" class="dict-section">
                    <div class="dict-header">
                        <h2>{{ dict.title }}</h2>
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

            <div v-else-if="simpleDictStore.searcherString" class="no-results">
                <UIcon name="i-lucide-search-x" class="icon" />
                <p>No results found for "{{ simpleDictStore.searcherString }}"</p>
            </div>

            <div v-else class="empty-state">
                <UIcon name="i-lucide-book-open" class="icon" />
                <p>Enter a search term to find entries in the dictionary</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dictionary-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content-wrapper {
    flex: 1;
    overflow-y: auto;
    scrollbar-gutter: stable;
    padding: 2rem;
}

.search-section {
    max-width: 1200px;
    margin: 0 auto 2rem;
    width: 100%;
}

.results-section {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.dict-section {
    background-color: #f9fafb;
    padding: 2rem;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

.dict-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.dict-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.no-results,
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    color: #6b7280;
}

.no-results .icon,
.empty-state .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.no-results p,
.empty-state p {
    font-size: 1.125rem;
}
</style>

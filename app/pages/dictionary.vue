<script setup lang="ts">
import { computed } from 'vue'
import { useSimpleDictStore } from '@/stores/simpleDict'

const simpleDictStore = useSimpleDictStore()

const matchingDictLinesArr = computed(() => {
    return simpleDictStore.matchingDictLinesArr.filter(({ key }: { key: string }) =>
        simpleDictStore.chosenDictionaries.includes(key)
    )
})

useSeoMeta({
    title: 'Dictionary - Modern Western Aramaic',
    description: 'Search the Arnold Maalula Dictionary for Modern Western Aramaic',
})
</script>

<template>
    <div class="dictionary-page">
        <div class="header">
            <h1>Modern Western Aramaic Dictionary</h1>
            <p>Search the Arnold Maalula Dictionary</p>
        </div>

        <div class="search-section">
            <DictSearcher/>
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
                    :dict-key="dict.key"
                />
            </div>
        </div>

        <div v-else-if="simpleDictStore.searcherString" class="no-results">
            <UIcon name="i-lucide-search-x" class="icon"/>
            <p>No results found for "{{ simpleDictStore.searcherString }}"</p>
        </div>

        <div v-else class="empty-state">
            <UIcon name="i-lucide-book-open" class="icon"/>
            <p>Enter a search term to find entries in the dictionary</p>
        </div>
    </div>
</template>

<style scoped>
.dictionary-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    text-align: center;
    margin-bottom: 3rem;
}

.header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header p {
    font-size: 1.125rem;
    color: #666;
}

.search-section {
    margin-bottom: 3rem;
}

.results-section {
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

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { SearcherWrapper, TSearchScope } from '@/composables/useSearcher'
import { books, type IBookWithHash } from '@/data/books'

interface ILine {
    line: string
    title: string
}

const props = defineProps<{
    linesMatching: ILine[]
    searcher: SearcherWrapper
    dictKey?: string
    scope?: TSearchScope
}>()

const pageSize = 50
const currentPage = ref(1)

const visibleItems = computed(() => {
    return props.linesMatching.slice(0, currentPage.value * pageSize)
})

const hasMore = computed(() => {
    return visibleItems.value.length < props.linesMatching.length
})

const currentBook = computed(() => {
    if (!props.dictKey) return null
    return books.find((book: IBookWithHash) => book.key === props.dictKey) ?? null
})

function getPageNumber(line: string): string | undefined {
    const match = line.match(/^{стр\.\s*(\d+)}/)
    return match ? match[1] : undefined
}

function getCleanedLine(line: string): string {
    return line.replace(/^{стр\.\s*\d+}\s*/, '')
}

function getBookRoute(pageNumber: string | undefined) {
    if (!pageNumber || !currentBook.value) return ''
    return `${currentBook.value.to}?page=${pageNumber}`
}

function loadMore() {
    currentPage.value++
}

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore.value) {
            loadMore()
        }
    })

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
    <div class="search-results">
        <div v-for="({ line, }, index) in visibleItems" :key="index" class="entry-item">
            <div class="entry-content">
                <NuxtLink
                    v-if="getPageNumber(line,) && currentBook"
                    :to="getBookRoute(getPageNumber(line,),)"
                    target="_blank"
                    class="page-badge"
                >
                    <UBadge color="primary" variant="solid">Page {{ getPageNumber(line,) }}</UBadge>
                </NuxtLink>
                <div class="entry-text">
                    <GrepLine :str="getCleanedLine(line,)" :searcher="searcher" :scope="scope" />
                </div>
            </div>
        </div>

        <div v-if="hasMore" ref="loadMoreTrigger" class="load-more">
            <UButton variant="ghost" icon="i-lucide-chevron-down" @click="loadMore">
                Load More
            </UButton>
        </div>
    </div>
</template>

<style scoped>
.search-results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.entry-item {
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    border: 1px solid #e5e5e5;
    transition: all 0.2s;
}

.entry-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.entry-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.page-badge {
    align-self: flex-start;
}

.entry-text {
    font-size: 1rem;
    line-height: 1.6;
}

.load-more {
    display: flex;
    justify-content: center;
    padding: 1rem;
}
</style>

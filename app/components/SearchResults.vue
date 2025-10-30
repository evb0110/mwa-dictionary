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
    <div class="flex flex-col gap-4">
        <div v-for="({ line }, index) in visibleItems" :key="index" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md dark:hover:shadow-gray-900/50">
            <div class="flex flex-col gap-2">
                <NuxtLink
                    v-if="getPageNumber(line) && currentBook"
                    :to="getBookRoute(getPageNumber(line))"
                    target="_blank"
                    class="self-start"
                >
                    <UBadge color="primary" variant="solid">Page {{ getPageNumber(line) }}</UBadge>
                </NuxtLink>
                <div class="text-base leading-relaxed text-gray-900 dark:text-gray-100">
                    <GrepLine :str="getCleanedLine(line)" :searcher="searcher" :scope="scope" />
                </div>
            </div>
        </div>

        <div v-if="hasMore" ref="loadMoreTrigger" class="flex justify-center p-4">
            <UButton variant="ghost" icon="i-lucide-chevron-down" @click="loadMore">
                Load More
            </UButton>
        </div>
    </div>
</template>

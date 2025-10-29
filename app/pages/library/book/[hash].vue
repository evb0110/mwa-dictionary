<script setup lang="ts">
import { computed } from 'vue'
import { useBookStore } from '@/stores/book'

const route = useRoute()
const hash = computed(() => route.params.hash as string)

const bookStore = useBookStore()

const book = computed(() => {
    const foundBook = bookStore.bookByHash[hash.value]
    if (!foundBook) return null

    return {
        title: foundBook.title,
        shortTitle: foundBook.shortTitle,
        author: foundBook.author,
        year: foundBook.year,
        pageCount: foundBook.pageCount,
        hash: foundBook.hash,
        to: foundBook.to,
    }
})

useSeoMeta({
    title: () => book.value?.title || 'Book',
    description: () => `${book.value?.author} (${book.value?.year})`,
})
</script>

<template>
    <div class="book-page">
        <div class="pdf-viewer-container">
            <ClientOnly>
                <LazyPdfPageViewer v-if="hash" :hash="hash" :book="book" />
            </ClientOnly>
        </div>
    </div>
</template>

<style scoped>
.book-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.pdf-viewer-container {
    flex: 1;
    overflow: hidden;
}
</style>

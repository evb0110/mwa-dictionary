<script setup lang="ts">
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()

const books = computed(() => bookStore.books)

useSeoMeta({
    title: 'Library - Modern Western Aramaic Dictionary',
    description: 'Browse available dictionaries and reference materials for Modern Western Aramaic',
})
</script>

<template>
    <div class="library-page">
        <div class="header">
            <h1>Library</h1>
            <p>Available dictionaries and reference materials</p>
        </div>

        <div class="books-list">
            <UCard v-for="book in books" :key="book.hash" class="book-card">
                <template #header>
                    <h2>{{ book.title }}</h2>
                </template>

                <div class="book-info">
                    <p>
                        <strong>Author:</strong>
                        {{ book.author }}
                    </p>
                    <p>
                        <strong>Year:</strong>
                        {{ book.year }}
                    </p>
                    <p>
                        <strong>Pages:</strong>
                        {{ book.pageCount }}
                    </p>
                </div>

                <template #footer>
                    <UButton
                        :to="book.to"
                        label="Open Book"
                        icon="i-lucide-book-open"
                        color="primary"
                    />
                </template>
            </UCard>
        </div>
    </div>
</template>

<style scoped>
.library-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    margin-bottom: 2rem;
}

.header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header p {
    color: #666;
}

.books-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.book-card {
    cursor: pointer;
    transition: transform 0.2s;
}

.book-card:hover {
    transform: translateY(-4px);
}

.book-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.book-info p {
    margin: 0;
}
</style>

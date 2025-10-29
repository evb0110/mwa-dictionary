<script setup lang="ts">
import { books } from '@/data/books'
</script>

<template>
    <div class="library-page">
        <AppHeader
            title="Library"
            subtitle="Available dictionaries and reference materials"
        />

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
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.books-list {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    align-items: start;
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

<script setup lang="ts">
import { ref, watch } from 'vue'
import { maalulaButtons } from '@/data/maalulaButtons'
import { useSimpleDictStore } from '@/stores/simpleDict'

const simpleDictStore = useSimpleDictStore()

const searcherInternal = ref('')

function search() {
    simpleDictStore.searcherString = searcherInternal.value
}

function clearSearch() {
    searcherInternal.value = ''
    search()
}

function insertChar(char: string) {
    searcherInternal.value += char
}

watch(
    () => simpleDictStore.searcherString,
    (value) => {
        searcherInternal.value = value
    },
    { immediate: true }
)
</script>

<template>
    <div class="searcher">
        <UInput
            v-model="searcherInternal"
            placeholder="Search in dictionary..."
            icon="i-lucide-search"
            @keyup.enter="search"
        >
            <template #trailing>
                <UButton
                    v-if="searcherInternal"
                    color="neutral"
                    variant="link"
                    icon="i-lucide-x"
                    @click="clearSearch"
                />
            </template>
        </UInput>

        <div class="keyboard-buttons">
            <UButton
                v-for="char in maalulaButtons"
                :key="char"
                size="xs"
                variant="ghost"
                @click="insertChar(char)"
            >
                {{ char }}
            </UButton>
        </div>

        <UButton
            :disabled="!searcherInternal"
            color="primary"
            size="lg"
            icon="i-lucide-search"
            @click="search"
        >
            Search
        </UButton>
    </div>
</template>

<style scoped>
.searcher {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
}

.keyboard-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    justify-content: center;
}
</style>

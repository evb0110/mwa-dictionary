<script setup lang="ts">
import { ref, watch } from 'vue'
import { maalulaButtons } from '@/data/maalulaButtons'
import { useSimpleDictStore } from '@/stores/simpleDict'

const simpleDictStore = useSimpleDictStore()

const searcherInternal = ref('')

const scopeOptions = [
    {
        label: 'Full text',
        value: 'full',
    },
    {
        label: 'Lemma only',
        value: 'lemma',
    },
]

function search() {
    simpleDictStore.updateSearcherString(searcherInternal.value)
}

function clearSearch() {
    searcherInternal.value = ''
    simpleDictStore.updateSearcherString('')
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
        <div class="search-row">
            <URadioGroup
                v-model="simpleDictStore.searchScope"
                :items="scopeOptions"
                orientation="horizontal"
                variant="list"
                size="lg"
                class="scope-radio flex items-center"
            />
            <UInput
                v-model="searcherInternal"
                placeholder="Search in dictionary..."
                icon="i-lucide-search"
                size="xl"
                class="input-flex"
                @keyup.enter="search"
            >
                <template #trailing>
                    <div class="trailing-actions">
                        <UButton
                            v-if="searcherInternal"
                            color="neutral"
                            variant="link"
                            icon="i-lucide-x"
                            @click="clearSearch"
                        />
                    </div>
                </template>
            </UInput>
            <UButton
                class="search-button"
                :disabled="!searcherInternal"
                color="primary"
                size="lg"
                icon="i-lucide-search"
                label="Search"
                @click="search"
            />
        </div>
        <div class="keyboard-buttons">
            <UButton
                v-for="char in maalulaButtons"
                :key="char"
                size="md"
                square
                color="neutral"
                variant="outline"
                @click="insertChar(char,)"
            >
                <span class="maalula-button">{{ char }}</span>
            </UButton>
        </div>
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

.search-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.input-flex {
    flex: 1;
    min-width: 0;
}

.search-button {
    flex-shrink: 0;
}

.scope-radio {
    margin-left: auto;
    align-self: stretch;
}

.keyboard-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    justify-content: center;
    width: 100%;
}
.trailing-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.maalula-button {
  font-family: Arial, serif;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
    { immediate: true },
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
            <DictSearchInput
                v-model="searcherInternal"
                @search="search"
                @clear="clearSearch"
            />
        </div>
        <MaalulaKeyboard @insert-char="insertChar" />
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

.scope-radio {
    margin-left: auto;
    align-self: stretch;
}
</style>

import { useRouteQuery } from '@vueuse/router'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import type { IDict } from '@/types'
import { useSearcher } from '@/composables/useSearcher'

const initialDictionaries: IDict[] = [
    {
        key: 'arnold',
        title: 'Arnold',
        isChosen: true,
    },
]

export const useSimpleDictStore = defineStore('simpleDictStore', () => {
    const chosenDictionaries = useRouteQuery<string[]>('dict', [])
    const searchTick = ref(0)

    const {
        searcher,
        searcherString,
        searchScope,
    } = useSearcher()

    watchEffect(() => {
        if (chosenDictionaries.value.length === 0) {
            chosenDictionaries.value = initialDictionaries.filter(({ isChosen }) => isChosen).map(({ key }) => key)
        }
    })

    function updateSearcherString(value: string) {
        if (searcherString.value !== value) {
            searcherString.value = value
            return
        }
        searchTick.value += 1
    }

    return {
        searcher,
        initialDictionaries,
        searcherString,
        searchScope,
        chosenDictionaries,
        searchTick,
        updateSearcherString,
    }
})

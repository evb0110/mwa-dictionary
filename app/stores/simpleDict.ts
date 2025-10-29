import { useRouteQuery } from '@vueuse/router'
import { defineStore } from 'pinia'
import { computed, watchEffect } from 'vue'
import type { IDict } from '@/types'
import { useGetResource } from '@/composables/useGetResource'
import { useSearcher } from '@/composables/useSearcher'
import { MAALULA_DICTS_URL } from '@/data/assets'

const initialDictionaries: IDict[] = [
    {
        key: 'arnold',
        title: 'Arnold',
        isChosen: true,
    },
]

export const useSimpleDictStore = defineStore('simpleDictStore', () => {
    const dictResource = useGetResource<Record<string, string[]>>(MAALULA_DICTS_URL, {})

    const dictData = computed(() => dictResource.data.value ?? {})

    const chosenDictionaries = useRouteQuery<string[]>('dict', [])

    const {
        searcher,
        searcherString,
    } = useSearcher()

    watchEffect(() => {
        if (chosenDictionaries.value.length === 0) {
            chosenDictionaries.value = initialDictionaries.filter(({ isChosen }) => isChosen).map(({ key }) => key)
        }
    })

    const matchingDictLinesArr = computed(() => {
        if (!searcherString.value) {
            return []
        }
        return initialDictionaries.map(({
            key,
            title,
        }) => {
            const lexicon = getLexiconByKeyName(key)
            const matchingLines = lexicon
                .filter((line: string) => searcher.value.regex.test(line))
                .map((line: string) => ({
                    title: '',
                    line,
                }))
            return {
                key,
                title,
                lines: matchingLines,
            }
        })
    })

    function getLexiconByKeyName(keyName: string) {
        return dictData.value?.[keyName] || []
    }

    return {
        searcher,
        initialDictionaries,
        dictData,
        searcherString,
        chosenDictionaries,
        matchingDictLinesArr,
    }
})

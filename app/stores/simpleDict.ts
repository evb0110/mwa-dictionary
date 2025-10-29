import { defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { useSearcher } from '@/composables/useSearcher'
import { AssetName } from '@/data/assets'
import { useAssetsStore } from '@/stores/assets'
import { ELanguage, ETranslationLanguage, type IDict } from '@/types'

function extractArrayFromQuery(value: LocationQueryValue | LocationQueryValue[] | undefined): string[] {
    if (value === undefined || value === null) {
        return []
    }
    if (Array.isArray(value)) {
        return value.filter((v): v is string => v !== null)
    }
    try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const Lexica: Partial<Record<ELanguage, IDict[]>> = {
    [ELanguage.maalula]: [
        {
            key: 'arnold',
            title: 'Arnold',
            isChosen: true,
            translationLanguage: ETranslationLanguage.German,
        },
    ],
}

export const useSimpleDictStore = defineStore('simpleDictStore', () => {
    const assetsStore = useAssetsStore()
    const route = useRoute()
    const router = useRouter()

    const language = ELanguage.maalula

    const assetName = AssetName.maalulaDictsJson

    const dictData = computed<Record<string, string[]>>(() => {
        const data = assetsStore[assetName]?.data
        if (!data || typeof data !== 'object') {
            return {}
        }
        return data as Record<string, string[]>
    })

    const chosenDictionaries = ref<string[]>(extractArrayFromQuery(route.query.dict))

    watch(
        () => route.query.dict,
        (newValue) => {
            chosenDictionaries.value = extractArrayFromQuery(newValue)
        }
    )

    watch(
        chosenDictionaries,
        (newValue) => {
            const currentValue = extractArrayFromQuery(route.query.dict)
            if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
                router.push({
                    query: {
                        ...route.query,
                        dict: newValue.length > 0 ? JSON.stringify(newValue) : undefined,
                    },
                })
            }
        },
        { deep: true }
    )

    const {
        searcher,
        searcherString,
    } = useSearcher()

    const initialDicts = computed<IDict[]>(() => Lexica[language] || [])

    watchEffect(() => {
        if (chosenDictionaries.value.length === 0) {
            chosenDictionaries.value = initialDicts.value.filter(({ isChosen }) => isChosen).map(({ key }) => key)
        }
    })

    const matchingDictLinesArr = computed(() => {
        if (!searcherString.value) {
            return []
        }
        return initialDicts.value.map(({
            key,
            title,
            translationLanguage,
        }) => {
            const lexicon = getLexiconByKeyName(key)
            const matchingLines = lexicon
                .filter((line: string) => searcher.value.regex.test(line))
                .map((line: string) => ({
                    title: '',
                    line,
                    translationLanguage,
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
        initialDicts,
        dictData,
        searcherString,
        chosenDictionaries,
        matchingDictLinesArr,
    }
})

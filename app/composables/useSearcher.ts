import { computed, ref, watch } from 'vue'
import type { LocationQueryValue } from 'vue-router'

export class SearcherWrapper {
    private _value: string
    constructor(str?: string) {
        this._value = str || ''
    }

    get value() {
        return this._value
    }

    set value(newValue) {
        this._value = newValue || ''
    }

    get isEmpty() {
        return !this.value
    }

    get regex() {
        const flags = 'iu'
        return RegExp(this.value, flags)
    }

    static instantiate(str: string) {
        return new SearcherWrapper(str)
    }
}

function extractStringFromQuery(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
    if (value === undefined || value === null) {
        return ''
    }
    if (Array.isArray(value)) {
        return value[0] || ''
    }
    return value
}

export const useSearcher = () => {
    const route = useRoute()
    const router = useRouter()

    const searcherString = ref(extractStringFromQuery(route.query.search))

    watch(
        () => route.query.search,
        (newValue) => {
            searcherString.value = extractStringFromQuery(newValue)
        }
    )

    watch(searcherString, (newValue) => {
        if (extractStringFromQuery(route.query.search) !== newValue) {
            router.push({
                query: {
                    ...route.query,
                    search: newValue || undefined,
                },
            })
        }
    })

    const searcher = computed(() => new SearcherWrapper(searcherString.value))

    return {
        searcherString,
        searcher,
    }
}

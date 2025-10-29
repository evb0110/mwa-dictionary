import { useRouteQuery } from '@vueuse/router'
import { computed } from 'vue'

export type TSearchScope = 'full' | 'lemma'

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

export const useSearcher = () => {
    const searcherString = useRouteQuery<string>('search', '')
    const searchScope = useRouteQuery<TSearchScope>('scope', 'full')

    const searcher = computed(() => new SearcherWrapper(searcherString.value))

    return {
        searcherString,
        searcher,
        searchScope,
    }
}

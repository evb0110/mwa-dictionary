import { getQuery } from 'h3'
import { searchDictionaries, getAllDictionariesMeta } from '~~/server/utils/dictionaries'

export default defineEventHandler(async (event) => {
    const qParam = getQuery(event).q
    const scopeParam = getQuery(event).scope
    const dictParam = getQuery(event).dict

    const q = typeof qParam === 'string' ? qParam : ''
    const scope = scopeParam === 'lemma' ? 'lemma' : 'full'

    let dictKeys: string[] = []
    if (Array.isArray(dictParam)) {
        dictKeys = dictParam.filter((d): d is string => typeof d === 'string')
    } else if (typeof dictParam === 'string') {
        dictKeys = dictParam.split(',').map(s => s.trim()).filter(Boolean)
    }

    if (dictKeys.length === 0) {
        const all = getAllDictionariesMeta()
        dictKeys = all.map(({ key }: { key: string }) => key)
    }

    const results = await searchDictionaries(event, q, scope, dictKeys)
    return results
})

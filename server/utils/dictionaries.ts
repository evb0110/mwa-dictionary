import type { H3Event } from 'h3'

interface IDictionaryMeta {
    key: string
    title: string
    dirName: string
}

interface ILineItem {
    title: string
    line: string
}

interface ISearchResultItem {
    key: string
    title: string
    lines: ILineItem[]
}

const DICTIONARIES: IDictionaryMeta[] = [
    {
        key: 'arnold',
        title: 'Arnold',
        dirName: 'arnold',
    },
]

const dictionaryCache: Map<string, string[]> = new Map()

function getDictionaryMetaByKey(key: string): IDictionaryMeta | null {
    for (const dict of DICTIONARIES) {
        if (dict.key === key) return dict
    }
    return null
}

export function getAllDictionariesMeta(): Array<Pick<IDictionaryMeta, 'key' | 'title'>> {
    return DICTIONARIES.map(({
        key,
        title,
    }) => ({
        key,
        title,
    }))
}

async function loadDictionaryLinesFromAssets(_event: H3Event, key: string) {
    const dictMeta = getDictionaryMetaByKey(key)
    if (!dictMeta) return []

    const storage = useStorage('assets:server')
    const base = `dictionaries/${dictMeta.dirName}`
    const keys = await storage.getKeys(base)
    const txtFiles = keys.filter(k => k.endsWith('.txt')).sort()

    const lines: string[] = []
    for (const fileKey of txtFiles) {
        let text = await storage.getItem<string>(fileKey)
        if (typeof text !== 'string') {
            const raw = await storage.getItemRaw(fileKey)
            if (typeof raw === 'string') {
                text = raw
            } else if (raw && typeof raw === 'object' && 'byteLength' in raw) {
                const uint8 = raw instanceof Uint8Array ? raw : new Uint8Array(raw as ArrayBuffer)
                text = new TextDecoder('utf-8').decode(uint8)
            } else {
                text = ''
            }
        }
        const normalized = text
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/[\u2028\u2029]/g, '\n')
            .replace(/[\u200B-\u200F\uFEFF]/g, '')
            .replace(/\n\s*\+\+\s*\n/g, '\n\n')
        const entries = normalized
            .split(/\n\s*\n/)
            .map(entry => entry.trim())
            .filter(entry => entry.length > 0)

        for (const entry of entries) {
            lines.push(entry)
        }
    }
    return lines
}

export async function getDictionaryLines(event: H3Event, key: string) {
    const memo = dictionaryCache.get(key)
    if (memo && Array.isArray(memo)) return memo

    const loaded = await loadDictionaryLinesFromAssets(event, key)
    dictionaryCache.set(key, loaded)
    return loaded
}

function escapeRegExp(input: string) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normalizeForLemma(input: string) {
    return input.normalize('NFC').replace(/[\u200B-\u200F\uFEFF]/g, '')
}

function lineWithoutPagePrefix(line: string) {
    return line.replace(/^{стр\.\s*\d+}\s*/, '')
}

function extractLemma(line: string): string {
    const cleaned = lineWithoutPagePrefix(line)
    const firstLine = cleaned.split('\n')[0] ?? ''
    const spaceOrEmoji = firstLine.search(/[\s\u{1F130}-\u{1F149}]/u)
    if (spaceOrEmoji === -1) {
        return firstLine
    }
    return firstLine.slice(0, spaceOrEmoji)
}

export async function searchDictionaries(event: H3Event, query: string, scope: 'full' | 'lemma', keys: string[]): Promise<ISearchResultItem[]> {
    if (!query) {
        return keys.map(key => ({
            key,
            title: getDictionaryMetaByKey(key)?.title || key,
            lines: [],
        }))
    }

    let regex: RegExp | null = null
    try {
        regex = new RegExp(query, 'iu')
    } catch {
        return keys.map(key => ({
            key,
            title: getDictionaryMetaByKey(key)?.title || key,
            lines: [],
        }))
    }

    const results: ISearchResultItem[] = []
    for (const key of keys) {
        const meta = getDictionaryMetaByKey(key)
        if (!meta) {
            results.push({
                key,
                title: key,
                lines: [],
            })
            continue
        }
        const lines = await getDictionaryLines(event, key)

        const matched: ILineItem[] = []
        if (scope === 'lemma') {
            const normalizedQuery = normalizeForLemma(query)
            const lemmaFlags = 'u'
            const lemmaRegex = new RegExp(escapeRegExp(normalizedQuery), lemmaFlags)
            for (const rawLine of lines) {
                const lemma = extractLemma(rawLine)
                const normalizedLemma = normalizeForLemma(lemma)
                if (lemmaRegex.test(normalizedLemma)) {
                    matched.push({
                        title: '',
                        line: rawLine,
                    })
                }
            }
        } else {
            for (const rawLine of lines) {
                if (regex && regex.test(rawLine)) {
                    matched.push({
                        title: '',
                        line: rawLine,
                    })
                }
            }
        }

        results.push({
            key,
            title: meta.title,
            lines: matched,
        })
    }

    return results
}

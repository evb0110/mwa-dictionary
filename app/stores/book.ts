import { isNaN, isNumber } from 'es-toolkit/compat'
import { defineStore } from 'pinia'
import * as RomanNumerals from 'roman-numerals'
import { computed } from 'vue'
import { idbGet, idbSet } from '@/utils/idb'
import { makeSimpleHash } from '@/utils/makeHash'

const arabicNumberOffset = 18
const romanNumberOffset = -1

export function getPageNumber(pageString: string) {
    if (!isNaN(Number(pageString))) {
        let pageNumber = Number(pageString)
        if (pageNumber >= 1002) {
            pageNumber -= 1
        }
        return pageNumber + arabicNumberOffset
    }
    try {
        const numberFromRoman = RomanNumerals.toArabic(pageString)
        return isNumber(numberFromRoman) ? numberFromRoman + romanNumberOffset : 1
    } catch {
        return 1
    }
}

export function getPageString(pageNumber: number) {
    if (pageNumber <= arabicNumberOffset) {
        return RomanNumerals.toRoman(pageNumber - romanNumberOffset)
    }
    let pageStringRaw = pageNumber - arabicNumberOffset
    if (pageStringRaw >= 1002) {
        pageStringRaw += 1
    }
    return String(pageStringRaw)
}

interface IBook {
    title: string
    shortTitle: string
    key: string
    author: string
    year: number
    linkBase: string
    pageCount: number
}

export interface IBookWithHash extends IBook {
    hash: string
    to: string
}

const booksRaw: IBook[] = [
    {
        title: 'Das Neuwestaramäische. VI. Wörterbuch',
        shortTitle: 'Arnold. NWA Wörterbuch',
        key: 'arnold',
        author: 'Werner Arnold',
        year: 2019,
        linkBase: 'https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_',
        pageCount: 1035,
    },
]

let uintCache: Map<string, Uint8Array>
const cacheRetrievalPromise = (async () => {
    const cache = await idbGet('bookStore', 'cache', 'uint')
    uintCache = cache || new Map()
})()

export const useBookStore = defineStore('bookStore', () => {
    const { data: books } = useAsyncData('books', async () => {
        const hashPromises = booksRaw.map(makeSimpleHash)
        const hashPromiseAll = Promise.all(hashPromises)
        const hashes = await hashPromiseAll
        return booksRaw.map((book, index): IBookWithHash => {
            const hash = hashes[index]
            if (!hash) {
                throw new Error('Hash generation failed for book')
            }
            return {
                ...book,
                hash,
                to: `/library/book/${hash}`,
            }
        })
    }, { default: () => [] })

    const bookByHash = computed<Record<string, IBookWithHash>>(() => {
        const result: Record<string, IBookWithHash> = {}
        for (const book of books.value) {
            if (book.hash) {
                result[book.hash] = book
            }
        }
        return result
    })

    async function getUintPromise(hash: string, pageNumber: number) {
        await cacheRetrievalPromise
        const key = JSON.stringify({
            hash,
            pageNumber,
        })

        if (uintCache.has(key)) {
            const cachedBuffer = uintCache.get(key)
            return cachedBuffer ? cachedBuffer.slice(0) : null
        }

        const book = bookByHash.value[hash]
        if (!book) {
            return null
        }
        const linkBase = book.linkBase
        const link = `${linkBase}${pageNumber.toString().padStart(4, '0')}.pdf`

        const result = await getUint8ArrayFromUrl(link)
        if (result) {
            uintCache.set(key, result)
            idbSet('bookStore', 'cache', 'uint', uintCache)
            return result.slice(0)
        }

        return result
    }

    return {
        books,
        bookByHash,
        getUintPromise,
    }
})

async function getUint8ArrayFromUrl(url: string) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            return null
        }
        const pdfBlob = await response.blob()
        const arrayBuffer = await pdfBlob.arrayBuffer()
        return new Uint8Array(arrayBuffer)
    } catch {
        return null
    }
}

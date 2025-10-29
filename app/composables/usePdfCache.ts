import { idbGet, idbSet } from '@/utils/idb'
import { bookByHash } from '@/data/books'

let uintCache: Map<string, Uint8Array>
const cacheRetrievalPromise = (async () => {
    const cache = await idbGet('bookStore', 'cache', 'uint')
    uintCache = cache || new Map()
})()

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

export async function getPdfPage(hash: string, pageNumber: number) {
    await cacheRetrievalPromise
    const key = JSON.stringify({
        hash,
        pageNumber,
    })

    if (uintCache.has(key)) {
        const cachedBuffer = uintCache.get(key)
        return cachedBuffer ? cachedBuffer.slice(0) : null
    }

    const book = bookByHash[hash]
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

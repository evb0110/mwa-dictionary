import { hash } from 'ohash'

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

export const books: IBookWithHash[] = booksRaw.map((book) => {
    const bookHash = hash(book)
    return {
        ...book,
        hash: bookHash,
        to: `/library/book/${bookHash}`,
    }
})

export const bookByHash: Record<string, IBookWithHash> = Object.fromEntries(
    books.map(book => [book.hash, book])
)

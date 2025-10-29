import { getAllDictionariesMeta } from '~~/server/utils/dictionaries'

export default defineEventHandler(() => {
    return getAllDictionariesMeta()
})

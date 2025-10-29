import { isNaN, isNumber } from 'es-toolkit/compat'
import * as RomanNumerals from 'roman-numerals'

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

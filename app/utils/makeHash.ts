import { v5 as uuidv5 } from 'uuid'

const uuidNamespace = '1b671a64-40d5-491e-99b0-da01ff1f3341'

function stableStringify(obj: unknown) {
    return JSON.stringify(obj, Object.keys(obj as Record<string, unknown>).sort())
}

export function makeHash(obj: unknown) {
    if (!obj) {
        obj = { random: Math.random() }
    }
    return makeSimpleHash(stableStringify(obj))
}

export function makeSimpleHash(obj: unknown) {
    return uuidv5(stableStringify(obj), uuidNamespace)
}

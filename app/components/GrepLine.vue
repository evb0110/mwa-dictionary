<script lang="ts" setup>
import { computed } from 'vue'
import type { SearcherWrapper, TSearchScope } from '@/composables/useSearcher'

const props = defineProps<{
    str: string
    searcher: SearcherWrapper
    scope?: TSearchScope
}>()

function sanitizeText(text: string) {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[\u2028\u2029]/g, '\n')
        .replace(/[\u200B-\u200F\uFEFF]/g, '')
}

const sanitizedText = computed(() => sanitizeText(props.str))

function escapeRegExp(input: string) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getHighlightConfig() {
    if (!props.searcher || props.searcher.isEmpty) {
        return null
    }

    if (props.scope === 'lemma') {
        const value = props.searcher.value
        if (!value) {
            return null
        }
        const flags = Array.from(new Set('iug'.split(''))).join('')
        return {
            source: escapeRegExp(value),
            flags,
        }
    }

    try {
        const baseRegex = props.searcher.regex
        const uniqueFlags = Array.from(new Set((baseRegex.flags + 'g').split(''))).join('')
        return {
            source: baseRegex.source,
            flags: uniqueFlags,
        }
    } catch {
        return null
    }
}

interface IMatch {
    start: number
    end: number
}

function getAllMatches(text: string, config: { source: string
    flags: string }): IMatch[] {
    const regex = new RegExp(config.source, config.flags)
    const matches: IMatch[] = []

    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
        const matchText = match[0]
        if (!matchText) {
            if (regex.lastIndex === match.index) {
                regex.lastIndex += 1
            }
            continue
        }

        const start = match.index
        matches.push({
            start,
            end: start + matchText.length,
        })

        if (!regex.global) {
            break
        }
    }

    return matches
}

const arrayOfArrays = computed(() => {
    const text = sanitizedText.value
    const config = getHighlightConfig()

    if (!config) {
        return text.split('\n').map(line => [{
            text: line,
            highlight: false,
        }])
    }

    const matches = getAllMatches(text, config)
    if (matches.length === 0) {
        return text.split('\n').map(line => [{
            text: line,
            highlight: false,
        }])
    }

    const lines = text.split('\n')
    const result: Array<Array<{ text: string
        highlight: boolean }>> = []

    let charIndex = 0
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex] ?? ''
        const lineStart = charIndex
        const lineEnd = charIndex + line.length

        const parts: Array<{ text: string
            highlight: boolean }> = []
        let lastIndex = 0

        for (const match of matches) {
            if (match.end <= lineStart || match.start >= lineEnd) {
                continue
            }

            const matchStartInLine = Math.max(0, match.start - lineStart)
            const matchEndInLine = Math.min(line.length, match.end - lineStart)

            if (matchStartInLine > lastIndex) {
                parts.push({
                    text: line.slice(lastIndex, matchStartInLine),
                    highlight: false,
                })
            }

            parts.push({
                text: line.slice(matchStartInLine, matchEndInLine),
                highlight: true,
            })
            lastIndex = matchEndInLine
        }

        if (lastIndex < line.length) {
            parts.push({
                text: line.slice(lastIndex),
                highlight: false,
            })
        }

        result.push(parts.length > 0
            ? parts
            : [{
                    text: line,
                    highlight: false,
                }])
        charIndex = lineEnd + 1
    }

    return result
})
</script>

<template>
    <div class="grep-line">
        <div v-for="(stringArray, paragraphIndex) in arrayOfArrays" :key="paragraphIndex">
            <span
                v-for="(part, index) in stringArray"
                :key="`${paragraphIndex}-${index}`"
                :class="{ highlight: part.highlight }"
            >
                {{ part.text }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.grep-line {
    display: grid;
    gap: 0.5rem;
}

span {
    font-family: sans-serif;
}

.highlight {
    color: red;
    font-weight: 600;
}
</style>

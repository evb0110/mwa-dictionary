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

interface IPart {
    text: string
    isMatch: boolean
    isLemma: boolean
}

const arrayOfArrays = computed(() => {
    const text = sanitizedText.value
    const config = getHighlightConfig()

    if (!config) {
        return text.split('\n').map(line => [{
            text: line,
            isMatch: false,
            isLemma: false,
        }])
    }

    const matches = getAllMatches(text, config)
    if (matches.length === 0) {
        return text.split('\n').map(line => [{
            text: line,
            isMatch: false,
            isLemma: false,
        }])
    }

    const lines = text.split('\n')
    const result: Array<Array<IPart>> = []

    let charIndex = 0
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex] ?? ''
        const lineStart = charIndex
        const lineEnd = charIndex + line.length

        const spaceOrEmojiMatch = line.search(/[\s\u{1F130}-\u{1F149}]/u)
        const lemmaEnd = spaceOrEmojiMatch === -1 ? line.length : spaceOrEmojiMatch
        const isLemmaMode = props.scope === 'lemma' && lineIndex === 0

        const parts: IPart[] = []
        let lastIndex = 0

        const addSegment = (startIdx: number, endIdx: number, isMatch: boolean) => {
            if (startIdx >= endIdx) return

            if (isLemmaMode && startIdx < lemmaEnd && endIdx > lemmaEnd) {
                parts.push({
                    text: line.slice(startIdx, lemmaEnd),
                    isMatch,
                    isLemma: true,
                })
                parts.push({
                    text: line.slice(lemmaEnd, endIdx),
                    isMatch,
                    isLemma: false,
                })
            } else {
                parts.push({
                    text: line.slice(startIdx, endIdx),
                    isMatch,
                    isLemma: isLemmaMode && startIdx < lemmaEnd,
                })
            }
        }

        for (const match of matches) {
            if (match.end <= lineStart || match.start >= lineEnd) {
                continue
            }

            const matchStartInLine = Math.max(0, match.start - lineStart)
            const matchEndInLine = Math.min(line.length, match.end - lineStart)

            if (matchStartInLine > lastIndex) {
                addSegment(lastIndex, matchStartInLine, false)
            }

            addSegment(matchStartInLine, matchEndInLine, true)
            lastIndex = matchEndInLine
        }

        if (lastIndex < line.length) {
            addSegment(lastIndex, line.length, false)
        }

        result.push(parts.length > 0
            ? parts
            : [{
                    text: line,
                    isMatch: false,
                    isLemma: isLemmaMode,
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
                :class="{
                    'highlight-match': part.isMatch,
                    'highlight-lemma': part.isLemma,
                }"
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

.highlight-match {
    color: red;
    font-weight: 600;
}

.highlight-lemma {
    background-color: rgb(245 197 76 / 0.25);
    padding-block: 4px;
}
</style>

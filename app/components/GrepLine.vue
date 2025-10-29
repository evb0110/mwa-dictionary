<script lang="ts" setup>
import { computed } from 'vue'
import type { SearcherWrapper } from '@/composables/useSearcher'

const props = defineProps<{
    str: string
    searcher: SearcherWrapper
}>()

const paragraphs = computed(() => props.str.split('\n'))

const arrayOfArrays = computed(() => {
    return paragraphs.value.map((paragraph) => {
        if (!props.searcher || props.searcher.isEmpty) {
            return [paragraph]
        }
        const pattern = new RegExp(`(${props.searcher.value})`, props.searcher.regex.flags)
        return paragraph.split(pattern).filter(part => part !== '')
    })
})
</script>

<template>
    <div class="grep-line">
        <div v-for="(stringArray, paragraphIndex) in arrayOfArrays" :key="paragraphIndex">
            <span v-for="(part, index) in stringArray" :key="index" :class="{ highlight: index % 2 }">
                {{ part }}
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
    font-family: 'Noto Sans', sans-serif;
}

.highlight {
    color: red;
    font-weight: 600;
}
</style>

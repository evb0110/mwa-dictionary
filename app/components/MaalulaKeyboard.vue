<script setup lang="ts">
import { maalulaButtons } from '@/data/maalulaButtons'

const emit = defineEmits<{
    insertChar: [char: string]
}>()
</script>

<template>
    <div class="keyboard-buttons">
        <UButton
            v-for="char in maalulaButtons"
            :key="char"
            size="md"
            square
            color="neutral"
            variant="outline"
            @click="emit('insertChar', char)"
        >
            <span class="maalula-button">{{ char }}</span>
        </UButton>
    </div>
</template>

<style scoped>
.keyboard-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    justify-content: center;
    width: 100%;
}

.maalula-button {
  font-family: Arial, serif;
}
</style>

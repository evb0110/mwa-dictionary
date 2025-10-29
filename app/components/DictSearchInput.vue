<script setup lang="ts">
const model = defineModel<string>({ required: true })

const emit = defineEmits<{
    search: []
    clear: []
}>()

function handleClear() {
    model.value = ''
    emit('clear')
}
</script>

<template>
    <div class="search-input-wrapper">
        <UInput
            v-model="model"
            placeholder="Search in dictionary..."
            icon="i-lucide-search"
            size="xl"
            class="input-flex"
            @keyup.enter="emit('search')"
        >
            <template #trailing>
                <div class="trailing-actions">
                    <UButton
                        v-if="model"
                        color="neutral"
                        variant="link"
                        icon="i-lucide-x"
                        @click="handleClear"
                    />
                </div>
            </template>
        </UInput>
        <UButton
            class="search-button"
            :disabled="!model"
            color="primary"
            size="lg"
            icon="i-lucide-search"
            label="Search"
            @click="emit('search')"
        />
    </div>
</template>

<style scoped>
.search-input-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex: 1;
}

.input-flex {
    flex: 1;
    min-width: 0;
}

.search-button {
    flex-shrink: 0;
}

.trailing-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}
</style>

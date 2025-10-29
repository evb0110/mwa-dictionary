<script setup lang="ts">
import { useElementBounding, useFullscreen, whenever } from '@vueuse/core'
import { debounce } from 'es-toolkit'
import { isNaN } from 'es-toolkit/compat'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type RenderTask } from 'pdfjs-dist'
import { computed, ref, watch } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { useScale } from '@/composables/useScale'
import { getPageNumber, getPageString, useBookStore, type IBookWithHash } from '@/stores/book'
import { getPadding } from '@/utils/getPadding'

GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs'

function extractStringFromQuery(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
    if (value === undefined || value === null) {
        return ''
    }
    if (Array.isArray(value)) {
        return value[0] || ''
    }
    return value
}

const props = defineProps<{
    hash: string
    book?: {
        title?: string
        author?: string
        year?: number
    } | null
}>()

const bookStore = useBookStore()

const book = computed<IBookWithHash | undefined>(() => {
    return bookStore.bookByHash[props.hash]
})

const pdfContainer = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { width: pdfContainerWidth } = useElementBounding(pdfContainer)
const contentBounding = useElementBounding(content)

const canvasWrapper = ref<HTMLElement | null>(null)
const pdfCanvas = ref<HTMLCanvasElement | null>(null)
const pdfWrapper = ref<HTMLElement | null>(null)
const pageAspectRatio = ref(1)

const padding = computed(() => getPadding(canvasWrapper.value))

const availableWidth = computed(() => {
    return pdfContainerWidth.value - padding.value.inline
})

const availableAspectRatio = computed(() => {
    return (contentBounding.width.value - padding.value.inline) / (contentBounding.height.value - padding.value.block)
})

const {
    scale: localScale,
    zoomIn,
    zoomOut,
    fitWidth,
    fitHeight,
} = useScale({
    availableAspectRatio,
    pageAspectRatio,
})

const {
    isFullscreen,
    toggle,
} = useFullscreen(pdfWrapper)

const isDragging = ref(false)
let startX = 0
let startY = 0
let scrollLeft = 0
let scrollTop = 0

function onMouseDown(e: MouseEvent) {
    if (!content.value) return
    isDragging.value = true
    startX = e.clientX
    startY = e.clientY
    scrollLeft = content.value.scrollLeft
    scrollTop = content.value.scrollTop
}

function onMouseMove(e: MouseEvent) {
    if (!isDragging.value || !content.value) return
    e.preventDefault()
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    content.value.scrollLeft = scrollLeft - dx
    content.value.scrollTop = scrollTop - dy
}

const route = useRoute()
const router = useRouter()

const currentPageString = ref(extractStringFromQuery(route.query.page) || getPageString(1))

watch(
    () => route.query.page,
    (newValue) => {
        currentPageString.value = extractStringFromQuery(newValue) || getPageString(1)
    }
)

watch(currentPageString, (newValue) => {
    if (extractStringFromQuery(route.query.page) !== newValue) {
        router.push({
            query: {
                ...route.query,
                page: newValue || undefined,
            },
        })
    }
})

const currentPageNumber = ref(1)
const totalPages = computed(() => book.value?.pageCount || 0)
const totalPagesStringLength = computed(() => totalPages.value.toString().length)
const isLoading = ref(false)

let pdfInstance: PDFDocumentProxy | null = null
let currentRenderTask: RenderTask | null = null
let renderVersion = 0

const debouncedRender = debounce(render, 100)

const isValidPageNumber = computed(() => {
    return (
        !isNaN(currentPageNumber.value) && currentPageNumber.value >= 1 && currentPageNumber.value <= totalPages.value
    )
})

watch([pdfContainerWidth, localScale], debouncedRender, { immediate: true })

whenever(currentPageNumber, () => {
    currentPageString.value = getPageString(currentPageNumber.value)
})

whenever(
    () => [props.hash, currentPageNumber],
    async () => {
        isLoading.value = true

        setPageNumber()

        const uint = await bookStore.getUintPromise(props.hash, currentPageNumber.value)
        if (currentPageNumber.value - 1 > 0) {
            bookStore.getUintPromise(props.hash, currentPageNumber.value - 1)
        }
        if (currentPageNumber.value + 1 <= totalPages.value) {
            bookStore.getUintPromise(props.hash, currentPageNumber.value + 1)
        }

        try {
            if (!uint) {
                return
            }

            getDocument(uint)
                .promise.then((pdf: PDFDocumentProxy) => {
                    pdfInstance = pdf
                    render()
                })
                .catch((error: Error) => {
                    console.error('PDF loading error:', error)
                })
                .finally(() => (isLoading.value = false))
        } catch (error) {
            console.error('PDF processing error:', error)
            isLoading.value = false
        }
    },
    {
        immediate: true,
        deep: true,
    }
)

async function render() {
    if (!pdfInstance || !pdfContainer.value || !pdfContainerWidth.value || !pdfCanvas.value) {
        return
    }

    if (currentRenderTask) {
        try {
            await currentRenderTask.cancel()
        } catch {
            // Cancellation errors are expected and can be safely ignored
        }
        currentRenderTask = null
    }

    const thisRenderVersion = ++renderVersion
    const capturedPdfInstance = pdfInstance

    try {
        const page = await capturedPdfInstance.getPage(1)

        if (renderVersion !== thisRenderVersion) {
            return
        }

        const viewport = page.getViewport({
            scale: localScale.value,
            rotation: 0,
        })
        const scale = availableWidth.value / viewport.width
        pageAspectRatio.value = viewport.width / viewport.height
        const scaledViewport = page.getViewport({
            scale,
            rotation: 0,
        })

        const canvas = pdfCanvas.value
        const context = canvas.getContext('2d')

        if (!context) {
            return
        }

        context.setTransform(1, 0, 0, 1, 0, 0)

        canvas.width = scaledViewport.width
        canvas.height = scaledViewport.height

        if (renderVersion !== thisRenderVersion) {
            return
        }

        const renderTask = page.render({
            canvasContext: context,
            canvas,
            viewport: scaledViewport,
        })

        currentRenderTask = renderTask

        await renderTask.promise

        if (renderVersion === thisRenderVersion) {
            currentRenderTask = null
        }
    } catch (error) {
        console.error('Rendering error:', error)
        if (renderVersion === thisRenderVersion) {
            currentRenderTask = null
        }
    }
}

function setPageNumber() {
    currentPageNumber.value = getPageNumber(currentPageString.value)
}

function navigateToPageNumber(newNumber: number) {
    currentPageNumber.value = newNumber
}
</script>

<template>
    <div ref="pdfWrapper" class="pdf-wrapper">
        <fieldset :disabled="isLoading">
            <AppHeader
                :title="book?.title || 'Loading...'"
                :subtitle="book?.author && book?.year ? `${book.author} (${book.year})` : undefined"
            >
                <template #pdf-nav>
                    <div class="nav-section gap">
                        <UButton
                            :disabled="currentPageNumber <= 1"
                            icon="i-lucide-chevrons-left"
                            variant="ghost"
                            size="lg"
                            @click="navigateToPageNumber(1,)"
                        />
                        <UButton
                            :disabled="currentPageNumber <= 1"
                            icon="i-lucide-chevron-left"
                            variant="ghost"
                            size="lg"
                            @click="navigateToPageNumber(currentPageNumber - 1,)"
                        />

                        <div class="page-number gap">
                            <span>Page</span>
                            <UInput
                                v-model="currentPageString"
                                size="lg"
                                class="page-input"
                                @change="setPageNumber"
                            />
                            <span class="current-page">({{ currentPageNumber || '' }})</span>
                            <span>of {{ totalPages }}</span>
                        </div>

                        <UButton
                            :disabled="currentPageNumber >= totalPages"
                            icon="i-lucide-chevron-right"
                            variant="ghost"
                            size="lg"
                            @click="navigateToPageNumber(currentPageNumber + 1,)"
                        />
                        <UButton
                            :disabled="currentPageNumber === totalPages"
                            icon="i-lucide-chevrons-right"
                            variant="ghost"
                            size="lg"
                            @click="navigateToPageNumber(totalPages,)"
                        />
                    </div>
                </template>

                <template #pdf-zoom>
                    <div class="zoom-section gap">
                        <UButton
                            icon="i-lucide-zoom-out"
                            variant="ghost"
                            size="lg"
                            @click="zoomOut"
                        />
                        <UButton
                            icon="i-lucide-zoom-in"
                            variant="ghost"
                            size="lg"
                            @click="zoomIn"
                        />
                        <UButton
                            icon="i-lucide-arrow-left-right"
                            variant="ghost"
                            size="lg"
                            @click="fitWidth"
                        />
                        <UButton
                            icon="i-lucide-arrow-up-down"
                            variant="ghost"
                            size="lg"
                            @click="fitHeight"
                        />
                        <UButton
                            :icon="isFullscreen ? 'i-lucide-minimize' : 'i-lucide-expand'"
                            variant="ghost"
                            size="lg"
                            @click="toggle"
                        />
                    </div>
                </template>
            </AppHeader>
        </fieldset>

        <div
            ref="content"
            class="content"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="isDragging = false"
            @mouseleave="isDragging = false"
        >
            <div v-if="isLoading" class="loading">
                <USkeleton class="h-full w-full" />
            </div>
            <div v-else-if="isValidPageNumber" ref="pdfContainer" class="pdf-container">
                <div ref="canvasWrapper" class="canvas-wrapper">
                    <canvas id="pdf-canvas" ref="pdfCanvas"></canvas>
                </div>
            </div>
            <div v-else class="error">
                Invalid page number
            </div>
        </div>
    </div>
</template>

<style scoped>
.pdf-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content {
    overflow: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    background-color: #eeeeee;
    cursor: grab;
    flex: 1;
    user-select: none;
}

.content:active {
    cursor: grabbing;
}

.nav-section {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.nav-section :deep(button .iconify) {
    width: 1.75rem !important;
    height: 1.75rem !important;
}

.zoom-section {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.zoom-section :deep(button .iconify) {
    width: 1.75rem !important;
    height: 1.75rem !important;
}

.gap {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.page-number {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0 0.5rem;
    font-family: monospace;
    font-variant-numeric: tabular-nums;
}

.page-input {
    max-width: 5rem;
}

.page-input :deep(input) {
    font-family: monospace;
    font-variant-numeric: tabular-nums;
}

.current-page {
    display: inline-block;
    min-width: v-bind('totalPagesStringLength + "ch"');
    text-align: right;
}

.pdf-container {
    display: flex;
    justify-content: center;
    padding: 0 2rem;
    min-height: 100%;
}

.canvas-wrapper {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading,
.error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
}
</style>

import { clamp } from 'es-toolkit'
import { ref } from 'vue'
import type { Ref } from 'vue'

const Scale = {
    min: 0.2,
    max: 5,
    default: 1,
    step: 1.2,
}

enum Zoom {
    IN = -1,
    OUT = 1
}

export const useScale = ({
    defaultScale = Scale.default,
    min = Scale.min,
    max = Scale.max,
    step = Scale.step,
    availableAspectRatio = ref(1),
    pageAspectRatio = ref(1),
}: {
    defaultScale?: number
    min?: number
    max?: number
    step?: number
    availableAspectRatio?: Ref<number>
    pageAspectRatio?: Ref<number>
} = {}) => {
    const scale = ref(defaultScale)

    function setScale(newScale: number) {
        scale.value = clamp(newScale, min, max)
    }
    function zoom(direction: Zoom) {
        const factor = step ** direction
        const newScale = scale.value * factor
        setScale(newScale)
    }
    function zoomIn() {
        zoom(Zoom.IN)
    }
    function zoomOut() {
        zoom(Zoom.OUT)
    }
    function fitWidth() {
        setScale(1)
    }
    function fitHeight() {
        setScale((1 / pageAspectRatio.value) * availableAspectRatio.value)
    }

    return {
        scale,
        zoomIn,
        zoomOut,
        fitWidth,
        fitHeight,
    }
}

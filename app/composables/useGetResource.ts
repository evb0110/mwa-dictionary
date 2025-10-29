import { ref, toValue } from 'vue'
import type { Ref } from 'vue'

export const useGetResource = <T = unknown>(
    link: Ref<string> | string,
    initial: T | null = null,
    maxRetries: number = 3
) => {
    const data = ref<T | null>(initial)
    const isLoading = ref(false)
    const error = ref<Error | null>(null)
    const retryCount = ref(0)
    const isRetrying = ref(false)

    async function fetchData() {
        const linkValue = toValue(link)
        if (!linkValue) {
            data.value = initial
            return
        }

        isLoading.value = true
        error.value = null
        let lastError: Error | null = null

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                if (attempt > 0) {
                    isRetrying.value = true
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
                }

                const response = await $fetch<T>(linkValue)

                retryCount.value = attempt
                isRetrying.value = false
                isLoading.value = false
                data.value = response
                return
            } catch (err) {
                lastError = err instanceof Error ? err : new Error(String(err))
                retryCount.value = attempt

                if (attempt === maxRetries) {
                    isRetrying.value = false
                    isLoading.value = false
                    error.value = lastError
                }
            }
        }
    }

    fetchData()

    return {
        data,
        isLoading,
        error,
        retryCount,
        isRetrying,
        canRetry: ref(false),
        retry: fetchData,
    }
}

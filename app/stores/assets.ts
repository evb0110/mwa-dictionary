import { mapValues } from 'es-toolkit'
import { defineStore } from 'pinia'
import { useGetResource } from '@/composables/useGetResource'
import { assets } from '@/data/assets'

export const useAssetsStore = defineStore('assetsStore', () => {
    return mapValues(assets, (asset) => {
        const resource = useGetResource(asset.link)
        return {
            ...asset,
            data: resource.data,
            isLoading: resource.isLoading,
            error: resource.error,
        }
    })
})

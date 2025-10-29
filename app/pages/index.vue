<script setup lang="ts">
useSeoMeta({
    title: 'Modern Western Aramaic Dictionary',
    description: 'Search the Arnold Maalula Dictionary and access Modern Western Aramaic reference materials.',
    ogTitle: 'Modern Western Aramaic Dictionary',
    ogDescription: 'Search the Arnold Maalula Dictionary and access Modern Western Aramaic reference materials.',
    ogImage: '/og-image.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Modern Western Aramaic Dictionary',
    twitterDescription: 'Search the Arnold Maalula Dictionary and access Modern Western Aramaic reference materials.',
    twitterImage: '/og-image.png',
})
</script>

<template>
    <div>
        <UPageHero
            title="Modern Western Aramaic Dictionary"
            description="Search the Arnold Maalula Dictionary and access Modern Western Aramaic reference materials."
            :links="[
                {
                    label: 'Search Dictionary',
                    to: '/dictionary',
                    trailingIcon: 'i-lucide-search',
                    size: 'xl',
                },
                {
                    label: 'Browse Library',
                    to: '/library',
                    icon: 'i-lucide-library',
                    size: 'xl',
                    color: 'neutral',
                    variant: 'subtle',
                },
            ]"
        />

        <UPageSection
            id="features"
            title="Comprehensive Aramaic Language Resources"
            description="Access comprehensive dictionary and reference materials for Modern Western Aramaic study."
            :features="[
                {
                    icon: 'i-lucide-book-open',
                    title: 'Arnold Dictionary',
                    description: 'Das Neuwestaramäische VI. Wörterbuch by Werner Arnold (2019) - 1035 pages.',
                },
                {
                    icon: 'i-lucide-search',
                    title: 'Advanced Search',
                    description: 'Search entries with regex and special characters for Aramaic transliteration.',
                },
                {
                    icon: 'i-lucide-file-text',
                    title: 'PDF Viewer',
                    description: 'Browse dictionary pages with navigation, zoom controls, and Roman numeral support.',
                },
                {
                    icon: 'i-lucide-link',
                    title: 'Linked References',
                    description: 'Direct links from dictionary entries to corresponding Arnold dictionary PDF pages.',
                },
                {
                    icon: 'i-lucide-type',
                    title: 'Special Characters',
                    description: 'Built-in keyboard for Aramaic transliteration with diacritics and symbols.',
                },
                {
                    icon: 'i-lucide-zap',
                    title: 'Fast & Efficient',
                    description: 'Optimized search with caching, lazy loading, and efficient PDF rendering.',
                },
            ]"
        />

        <UPageSection>
            <UPageCTA
                title="Start exploring Modern Western Aramaic"
                description="Access comprehensive dictionary resources and reference materials for Aramaic research."
                variant="subtle"
                :links="[
                    {
                        label: 'Search Dictionary',
                        to: '/dictionary',
                        trailingIcon: 'i-lucide-arrow-right',
                        color: 'neutral',
                    },
                    {
                        label: 'Browse Library',
                        to: '/library',
                        icon: 'i-lucide-library',
                        color: 'neutral',
                        variant: 'outline',
                    },
                ]"
            />
        </UPageSection>
    </div>
</template>

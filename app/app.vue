<script setup>
useHead({
    meta: [{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
    }],
    link: [{
        rel: 'icon',
        href: '/favicon.ico',
    }],
    htmlAttrs: { lang: 'en' },
})

const title = 'Modern Western Aramaic Dictionary'
const description = 'Search the Arnold Maalula Dictionary and access reference materials for Modern Western Aramaic research.'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
})
</script>

<template>
    <UApp>
        <NuxtPage/>
    </UApp>
</template>

<template>
  <section class="p-10 text-center bg-gradient-to-b from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl">
    <h1 class="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
      PoliSongStock Marketplace
    </h1>
    <p class="text-xl opacity-90 max-w-2xl mx-auto">
      Descubre MP3s, explora vinilos coleccionables, crea playlists y comercia música como nunca antes.
    </p>

    <div class="mt-10 flex justify-center gap-6">
      <NuxtLink to="/vinyls" class="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:scale-105 transition-transform">
        Explorar Vinilos
      </NuxtLink>
      <NuxtLink to="/songs" class="px-6 py-3 bg-indigo-900 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform">
        Explorar Canciones
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'PoliSongStock',
})
</script>

<template>
  <section class="p-10">
    <h1 class="text-4xl font-bold text-center mb-10">
      Canciones MP3 Disponibles
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="song in canciones"
        :key="song.id"
        class="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition-transform"
      >
        <h2 class="text-xl font-semibold mb-1">{{ song.titulo }}</h2>
        <p class="text-gray-600 mb-3">{{ song.artista }}</p>

        <audio controls class="w-full mb-3">
          <source :src="song.url" type="audio/mpeg" />
        </audio>

        <p class="font-bold text-indigo-700">
          Precio: {{ song.precio }} COP
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const canciones = [
  {
    id: 1,
    titulo: "Billie Jean",
    artista: "Michael Jackson",
    url: "/audio/billie-jean.mp3",
    precio: "5.000",
  },
  {
    id: 2,
    titulo: "Around the World",
    artista: "Daft Punk",
    url: "/audio/around.mp3",
    precio: "5.000"
  },
  {
    id: 3,
    titulo: "Imagine",
    artista: "John Lennon",
    url: "/audio/imagine.mp3",
    precio: "5.000"
  }
];
useHead({
  title: 'PoliSongStock - Canciones',
})
</script>
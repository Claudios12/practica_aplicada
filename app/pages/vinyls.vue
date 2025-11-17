<template>
  <section class="p-10">
    <h1 class="text-4xl font-bold text-center mb-10">
      Colección de Vinilos
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="vinyl in vinilos"
        :key="vinyl.id"
        class="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition-transform"
      >
        <img :src="vinyl.imagen" alt="Vinilo" class="rounded-lg mb-4" />

        <h2 class="text-xl font-semibold">{{ vinyl.titulo }}</h2>
        <p class="text-gray-600">{{ vinyl.artista }}</p>

        <p class="mt-3 font-bold text-indigo-700">
          Precio: {{ vinyl.precio }} COP
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const vinilos = [
  {
    id: 1,
    titulo: "Abbey Road",
    artista: "The Beatles",
    precio: "120.000",
    imagen: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
  },
  {
    id: 2,
    titulo: "Thriller",
    artista: "Michael Jackson",
    precio: "150.000",
    imagen: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png"
  },
  {
    id: 3,
    titulo: "Random Access Memories",
    artista: "Daft Punk",
    precio: "130.000",
    imagen: "https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png"
  }
];
useHead({
  title: 'PoliSongStock - Vinilos',
})
</script>
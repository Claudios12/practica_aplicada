<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 py-10">
    <h1 class="text-4xl font-bold text-center mb-10">Canciones Disponibles</h1>

    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div 
        v-for="song in songs" 
        :key="song.id" 
        class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        <!-- Imagen clickeable -->
        <NuxtLink :to="`/vinyls/${song.id}`">
          <img :src="song.imagen" :alt="song.titulo" class="h-64 w-full object-cover hover:opacity-90 transition" />
        </NuxtLink>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <NuxtLink :to="`/vinyls/${song.id}`">
              <h2 class="text-xl font-semibold mb-2 hover:underline">
                {{ song.titulo }}
              </h2>
            </NuxtLink>
            <p class="text-gray-600 mb-2">{{ song.artista }}</p>
            <p class="text-gray-600 mb-4">{{ song.descripcion }}</p>
            <p class="text-indigo-700 font-bold text-lg">${{ song.precio }}</p>
          </div>

          <audio controls class="w-full mb-3">
          <source :src="song.url" type="audio/mpeg" />
        </audio>
          
          <button
            @click="addToCart(song)"
            class="mt-4 bg-indigo-700 text-white py-2 px-4 rounded-xl font-semibold hover:bg-indigo-800 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
const { $db } = useNuxtApp();

// Lista de vinilos
const songs = ref([
  {
    id: 1,
    titulo: "Get Lucky",
    artista: "Daft Punk",
    descripcion: "Canciòn popular de Daft Punk.",
    precio: 5000,
    imagen: "https://uk-shop.daftpunk.com/cdn/shop/files/DP_RAM.jpg?v=1757505811",
    url:"/audio/get-lucky.mp3"
  },
  {
    id: 2,
    titulo: "Thriller",
    artista: "Michael Jackson",
    descripcion: "Canciòn icónica de Michael Jackson.",
    precio: 5000,
    imagen: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448106660145_85quality_Michael_Jackson_-_Thriller_25th_Anniversary_Edition.webp?v=1734325729&width=368",
    url:"/audio/thriller.mp3"
  },
  {
    id: 3,
    titulo: "Back in Black",
    artista: "AC/DC",
    descripcion: "Canciòn clásica de AC/DC.",
    precio: 5000,
    imagen: "https://store.acdc.com/cdn/shop/files/X3LPAC14.jpg?v=1739997264",
    url:"/audio/back-in-black.mp3"
  },
  {
    id: 4,
    titulo: "From the Start",
    artista: "Laufey",
    descripcion: "Canciòn melódica de Laufey.",
    precio: 5000,
    imagen: "https://tigervaultrecords.com/cdn/shop/files/B8F00A25-AAB3-4EE4-B88A-BF7F6899D093.jpg?v=1731345985&width=1920",
    url:"/audio/from-the-start.mp3"
  }
]);

// Función para agregar al carrito
const addToCart = async (vinilo: any) => {
  try {
    await addDoc(collection($db, "cart"), vinilo);
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    alert("No se pudo agregar al carrito");
  }
};
</script>

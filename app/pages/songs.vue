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
          <source :src="song.urlprueba" type="audio/mpeg" />
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
    imagen: "https://upload.wikimedia.org/wikipedia/en/7/71/Get_Lucky.jpg",
    urlprueba:"/audio/get-lucky.mp3",
    url:"/audio/get_lucky_completo.mp3"
  },
  {
    id: 2,
    titulo: "Thriller",
    artista: "Michael Jackson",
    descripcion: "Canciòn icónica de Michael Jackson.",
    precio: 5000,
    imagen: "https://upload.wikimedia.org/wikipedia/en/8/89/Michael_jackson_thriller_12_inch_single_USA.jpg",
    urlprueba:"/audio/thriller.mp3",
    url:"/audio/thriller_completo.mp3"

  },
  {
    id: 3,
    titulo: "Back in Black",
    artista: "AC/DC",
    descripcion: "Canciòn clásica de AC/DC.",
    precio: 5000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG563E6p5rw9Qg98N8M53jGTyu2tiAj9oHQA&s",
    urlprueba:"/audio/back-in-black.mp3",
    url:"/audio/back_in_black_completo.mp3"
  },
  {
    id: 4,
    titulo: "From the Start",
    artista: "Laufey",
    descripcion: "Canciòn melódica de Laufey.",
    precio: 5000,
    imagen: "https://i.discogs.com/QZdqej7qQgStB1grzTASg98ACtUCOAYsuIZpbmoXUOA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4MzEx/OTc2LTE2OTQ5ODkz/NzItNjA2NS5qcGVn.jpeg",
    urlprueba:"/audio/from-the-start.mp3",
    url:"/audio/from_the_start_completo.mp3"
  }
]);

// Función para agregar al carrito
const addToCart = async (song: any) => {
  try {
    await addDoc(collection($db, "cart"), {
      productId: song.id,
      titulo: song.titulo,
      artista: song.artista,
      precio: song.precio,
      imagen: song.imagen ?? null,
      url: song.url ?? null,

    });
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    alert("No se pudo agregar al carrito");
  }
};
</script>

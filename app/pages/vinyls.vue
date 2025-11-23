<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 py-10">
    <h1 class="text-4xl font-bold text-center mb-10">Vinilos Disponibles</h1>

    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div 
        v-for="vinilo in vinyls" 
        :key="vinilo.id" 
        class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        <!-- Imagen clickeable -->
        <NuxtLink :to="`/vinyls/${vinilo.id}`">
          <img :src="vinilo.imagen" :alt="vinilo.titulo" class="h-64 w-full object-cover hover:opacity-90 transition" />
        </NuxtLink>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <NuxtLink :to="`/vinyls/${vinilo.id}`">
              <h2 class="text-xl font-semibold mb-2 hover:underline">
                {{ vinilo.titulo }}
              </h2>
            </NuxtLink>

            <p class="text-gray-600 mb-4">{{ vinilo.descripcion }}</p>
            <p class="text-indigo-700 font-bold text-lg">${{ vinilo.precio }}</p>
          </div>
          
          <button
            @click="addToCart(vinilo)"
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
const vinyls = ref([
  {
    id: 1,
    titulo: "Random Access Memories - Daft Punk",
    descripcion: "Álbum ganador del Grammy con éxitos como 'Get Lucky'.",
    precio: 145000,
    imagen: "https://uk-shop.daftpunk.com/cdn/shop/files/DP_RAM.jpg?v=1757505811"
  },
  {
    id: 2,
    titulo: "Thriller - Michael Jackson",
    descripcion: "El álbum más vendido de todos los tiempos.",
    precio: 145000,
    imagen: "https://cdn.shopify.com/s/files/1/0704/2026/7313/files/8448106660145_85quality_Michael_Jackson_-_Thriller_25th_Anniversary_Edition.webp?v=1734325729&width=368",
  },
  {
    id: 3,
    titulo: "Back in Black - AC/DC",
    descripcion: "Rock clásico de la banda AC/DC.",
    precio: 132000,
    imagen: "https://store.acdc.com/cdn/shop/files/X3LPAC14.jpg?v=1739997264",
  },
  {
    id: 4,
    titulo: "From the Start - Laufey",
    descripcion: "Álbum debut de la talentosa cantante y compositora Laufey.",
    precio: 27000,
    imagen: "https://tigervaultrecords.com/cdn/shop/files/B8F00A25-AAB3-4EE4-B88A-BF7F6899D093.jpg?v=1731345985&width=1920",
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

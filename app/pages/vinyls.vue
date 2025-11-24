<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 py-10">
    <h1 class="text-4xl font-bold text-center mb-10">Vinilos Disponibles</h1>

    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div 
        v-for="vinilo in vinyls" 
        :key="vinilo.productId"
        class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        <!-- Imagen clickeable -->
        <NuxtLink :to="`/vinyls/${vinilo.productId}`">
          <img :src="vinilo.imagen" :alt="vinilo.titulo" class="h-64 w-full object-cover hover:opacity-90 transition" />
        </NuxtLink>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <NuxtLink :to="`/vinyls/${vinilo.productId}`">
              <h2 class="text-xl font-semibold mb-2 hover:underline">
                {{ vinilo.titulo }}
              </h2>
            </NuxtLink>
            <p class="text-gray-700 font-medium">{{ vinilo.artista }}</p>
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
import { vinylList } from "~/data/vinyls";
const { $db } = useNuxtApp();

// Lista de vinilos
const vinyls = ref([...vinylList]);

// Función para agregar al carrito
const addToCart = async (vinilo: any) => {
  try {
    await addDoc(collection($db, "cart"), {
      productId: vinilo.productId,
      titulo: vinilo.titulo,
      artista: vinilo.artista ?? null,
      precio: vinilo.precio,
      imagen: vinilo.imagen ?? null,
      url: vinilo.url ?? null
    });
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    alert("No se pudo agregar al carrito");
  }
};
</script>

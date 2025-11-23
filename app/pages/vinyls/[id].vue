<template>
  <div class="p-6 max-w-2xl mx-auto">
    <NuxtLink to="/vinyls" class="text-blue-500 underline">⬅ Volver</NuxtLink>

    <div v-if="vinyl">
      <h1 class="text-3xl font-bold mt-4">{{ vinyl.titulo }}</h1>
      <p class="text-gray-600 text-lg">{{ vinyl.artista }}</p>

      <img
        :src="vinyl.imagen"
        alt="cover"
        class="w-64 h-64 object-cover mt-6 rounded shadow"
      />

      <p class="mt-4 text-xl font-semibold">${{ vinyl.precio }}</p>

      <p class="mt-2">{{ vinyl.descripcion   }}</p>

      <button
        class="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        @click="addToCart"
      >
        Agregar al carrito
      </button>
    </div>

    <div v-else>
      <p class="text-red-500">Vinilo no encontrado</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { vinylList } from "~/data/vinyls";

const route = useRoute();
const id = Number(route.params.id);

// Buscar el vinilo por ID
const vinyl = vinylList.find(v => v.id === id);

function addToCart() {
  alert("Carrito aún no está conectado, pero este es el botón 👍");
}
</script>

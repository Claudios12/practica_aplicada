<template>
  <section class="container mx-auto py-10">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-800">Tu Carrito</h1>

    <div v-if="carrito.length === 0" class="text-center text-gray-500">
      No tienes productos en el carrito.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in carrito" :key="item.id" class="bg-white rounded-xl shadow p-4 flex flex-col">
        <img :src="item.imagen" :alt="item.titulo" class="w-full h-60 object-cover rounded-lg mb-4" />
        <h2 class="text-xl font-semibold mb-2">{{ item.titulo }}</h2>
        <p class="text-gray-600 mb-2">{{ item.artista }}</p>
        <p class="font-bold text-indigo-700 mb-4">{{ item.precio }} COP</p>

        <button
          @click="eliminarDelCarrito(item.id)"
          class="mt-auto px-4 py-2 bg-red-600 text-black rounded-lg hover:bg-red-700 transition">
          Eliminar
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
const { $db } = useNuxtApp(); 

interface ItemCarrito {
  id: string;
  titulo: string;
  artista: string;
  precio: string;
  imagen: string;
}

const carrito = ref<ItemCarrito[]>([]);

const obtenerCarrito = async () => {
  const querySnapshot = await getDocs(collection($db, "cart"));
  carrito.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<ItemCarrito, "id">)
  }));
};

const eliminarDelCarrito = async (id: string) => {
  await deleteDoc(doc($db, "cart", id));
  carrito.value = carrito.value.filter(item => item.id !== id);
};

onMounted(() => {
  obtenerCarrito();
});

useHead({
  title: 'Carrito',
})
</script>
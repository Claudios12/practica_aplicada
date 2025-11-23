<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-wide">PoliSongStock</h1>

        <ul class="flex gap-6 text-lg font-medium items-center">
          <li>
            <NuxtLink to="/" class="hover:underline">Inicio</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/vinyls" class="hover:underline">Vinilos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/songs" class="hover:underline">Canciones</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/playlist" class="hover:underline">Mi Música</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pedidos" class="hover:underline">Pedidos</NuxtLink>  
          </li>
          <!-- 🔥 BOTÓN DE CARRITO CON CONTADOR -->
          <li class="relative">
            <NuxtLink to="/carrito" class="hover:underline flex items-center gap-1">

              <!-- Icono -->
              🛒 Carrito

              <!-- Contador -->
              <span v-if="carritoCount > 0"
                class="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                {{ carritoCount }}
              </span>
            </NuxtLink>
          </li>
          <!-- 🔥 BOTÓN LOGIN / LOGOUT -->
          <li v-if="user"> <button @click="logout" class="bg-red-600 px-3 py-1 rounded hover:bg-red-700"> Cerrar sesión
            </button> </li>
          <li v-else>
            <NuxtLink to="/login" class="bg-green-600 px-3 py-1 rounded hover:bg-green-700"> Iniciar sesión </NuxtLink>
          </li>

        </ul>
      </nav>
    </header>

    <main class="container mx-auto py-10">
      <NuxtPage />
    </main>

    <footer class="bg-gray-900 text-gray-300 py-6 mt-10">
      <div class="container mx-auto text-center">
        <p class="opacity-80">© 2025 PoliSongStock Marketplace — Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";

const { $db, $auth } = useNuxtApp();

// contador reactivo
const carritoCount = ref(0);
const user = ref<User | null>(null);

// escuchar cambios en autenticación
onMounted(() => {
  onAuthStateChanged($auth, (currentUser) => {
    user.value = currentUser;
  });

  // escuchar cambios en tiempo real del carrito
  onSnapshot(collection($db, "cart"), (snapshot) => {
    carritoCount.value = snapshot.size; // número total de documentos
  });
});

// función para cerrar sesión
const logout = async () => {
  await signOut($auth);
  user.value = null;
  navigateTo("/");
};
</script>

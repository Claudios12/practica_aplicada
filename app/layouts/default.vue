<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-wide">PoliSongStock</h1>
        <ul class="flex gap-6 text-lg font-medium items-center">
          <li><NuxtLink to="/" class="hover:underline">Inicio</NuxtLink></li>
          <li><NuxtLink to="/vinyls" class="hover:underline">Vinilos</NuxtLink></li>
          <li><NuxtLink to="/songs" class="hover:underline">Canciones</NuxtLink></li>
          <li><NuxtLink to="/marketplace" class="hover:underline">Marketplace</NuxtLink></li>
        <li><NuxtLink to="/carrito" class="hover:underline">Carrito</NuxtLink></li>

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

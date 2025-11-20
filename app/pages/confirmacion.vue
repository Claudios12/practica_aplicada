<template>
  <section class="container mx-auto text-center py-20">
    <h1 class="text-4xl font-bold text-green-700">¡Compra realizada con éxito!</h1>
    <p class="text-gray-600 mt-4 text-lg">
      Gracias por tu compra. Recibirás un correo con los detalles del pedido.
    </p>

    <NuxtLink
      to="/"
      class="mt-10 inline-block px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800">
      Volver al inicio
    </NuxtLink>
  </section>
</template>

<script setup>
useHead({
  title: "Confirmación"
});
</script>

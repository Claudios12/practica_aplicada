<template>
  <section class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-center mb-6">Datos de Envío</h1>

    <form @submit.prevent="continuar" class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <div class="mb-4">
        <label class="block font-medium">Nombre completo</label>
        <input v-model="nombre" type="text" class="w-full border rounded p-2">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Dirección</label>
        <input v-model="direccion" type="text" class="w-full border rounded p-2">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Teléfono</label>
        <input v-model="telefono" type="text" class="w-full border rounded p-2">
      </div>

      <div class="mb-4">
        <label class="block font-medium">Email</label>
        <input v-model="email" type="email" class="w-full border rounded p-2">
      </div>

      <button class="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-700">
        Continuar al Pago
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nombre = ref("");
const direccion = ref("");
const telefono = ref("");
const email = ref("");

const continuar = () => {
  if (!nombre.value || !direccion.value || !telefono.value || !email.value) {
    alert("Por favor completa todos los campos.");
    return;
  }

  sessionStorage.setItem("datos_envio", JSON.stringify({
    nombre: nombre.value,
    direccion: direccion.value,
    telefono: telefono.value,
    email: email.value
  }));

  router.push("/pago");
};
</script>

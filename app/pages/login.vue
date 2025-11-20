<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold text-center text-indigo-600 mb-6">
        Iniciar sesión
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required
            class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label>Contraseña</label>
          <input v-model="password" type="password" required
            class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          <span v-if="!loading">Iniciar sesión</span>
          <span v-else>Cargando...</span>
        </button>
      </form>

      <p class="text-center mt-4">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-indigo-600 underline">Regístrate aquí</NuxtLink>
      </p>

      <p v-if="error" class="text-red-500 text-center mt-4 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  try {
    await login(email.value, password.value);
    router.push("/");
  } catch (err) {
    error.value = "Correo o contraseña incorrectos";
  } finally {
    loading.value = false;
  }
};
</script>

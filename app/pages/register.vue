<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold text-center text-indigo-600 mb-6">
        Crear cuenta
      </h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label>Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label>Contraseña</label>
          <input v-model="password" type="password" required minlength="6" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label>Confirmar contraseña</label>
          <input v-model="confirmPassword" type="password" required minlength="6" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          <span v-if="!loading">Crear cuenta</span>
          <span v-else>Creando...</span>
        </button>
      </form>

      <p class="text-center mt-4">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-indigo-600 underline">Ingresar</NuxtLink>
      </p>

      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-600 text-center mt-4">{{ success }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const router = useRouter();
const { register } = useAuth();

const handleRegister = async () => {
  error.value = "";
  success.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Las contraseñas no coinciden.";
    return;
  }

  loading.value = true;

  try {
    await register(email.value, password.value);

    success.value = "Cuenta creada correctamente.";
    setTimeout(() => router.push("/login"), 1500);
  } catch (err: any) {
    error.value = err.message || "Error creando usuario.";
  } finally {
    loading.value = false;
  }
};
</script>

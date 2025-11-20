<template>
  <div class="container mx-auto py-20 text-center">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">
      Esperando aprobación del pago...
    </h1>

    <p class="text-gray-600">
      Tu compra está siendo verificada. Esto puede tardar un momento.
    </p>

    <div class="mt-10 text-indigo-600 font-semibold animate-pulse">
      Procesando pago...
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { doc, onSnapshot } from "firebase/firestore";

const { $db } = useNuxtApp();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const orderId = route.query.id;
  if (!orderId) return;

  const ref = doc($db, "pedidos", orderId);

  onSnapshot(ref, (snap) => {
    const data = snap.data();
    if (!data) return;

    if (data.aprobado === true) {
      router.push("/pedido-aprovado");
    }
  });
});
</script>


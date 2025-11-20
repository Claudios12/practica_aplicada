<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Confirmar compra</h1>

    <p class="mb-4 text-gray-700">
      Estás a punto de confirmar tu compra. Haz clic en el botón para continuar.
    </p>

    <button
      @click="confirmarPago"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Confirmar compra
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

const router = useRouter();
const { $db } = useNuxtApp();

// 🔥 Leer carrito directamente desde Firestore
const obtenerCarrito = async () => {
  const snapshot = await getDocs(collection($db, "cart"));
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
};

const vaciarCarrito = async () => {
  const snapshot = await getDocs(collection($db, "cart"));
  const deletions = snapshot.docs.map(d => deleteDoc(doc($db, "cart", d.id)));
  await Promise.all(deletions);
};

const confirmarPago = async () => {
  const datosEnvio = JSON.parse(sessionStorage.getItem("datos_envio"));

  if (!datosEnvio) {
    alert("Faltan tus datos de envío.");
    return router.push("/datos-envio");
  }

  const carrito = await obtenerCarrito();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return router.push("/carrito");
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const orderId = Date.now().toString();

  await setDoc(doc($db, "pedidos", orderId), {
    id: orderId,
    productos: carrito,
    total,
    aprobado: false,
    datosEnvio,
    timestamp: new Date(),
  });

  await vaciarCarrito();

  router.push(`/esperando-aprobacion?id=${orderId}`);
};
</script>

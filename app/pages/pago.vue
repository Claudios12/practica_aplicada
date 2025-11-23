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
import { doc, setDoc, getDocs, collection, deleteDoc, addDoc } from "firebase/firestore";

const router = useRouter();
const { $db } = useNuxtApp();
const { user, loadingUser } = useCurrentUser();

// 🔥 Obtener carrito real
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

  // Esperar a que Auth cargue
  if (loadingUser.value) {
    return alert("Cargando usuario...");
  }

  if (!user.value) {
    alert("Debes iniciar sesión para comprar.");
    return router.push("/login");
  }

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

  const total = carrito.reduce((acc, item) => acc + Number(item.precio), 0);

  const orderId = Date.now().toString();

  // 🔥 GUARDAR PEDIDO
  await setDoc(doc($db, "orders", orderId), {
    id: orderId,
    userId: user.value.uid,      // 👈 FUNDAMENTAL
    productos: carrito,
    total,
    datosEnvio,
    aprobado: false,
    timestamp: new Date(),
  });

  // 🔥 GUARDAR CANCIONES COMPRADAS
  const canciones = carrito.filter(item => item.url); // tiene URL = es canción

  for (const song of canciones) {
    await addDoc(collection($db, "purchased_songs"), {
      userId: user.value.uid,
      productId: song.productId,
      titulo: song.titulo,
      artista: song.artista,
      url: song.url,
      precio: song.precio,
      fechaCompra: new Date(),
    });
  }

  await vaciarCarrito();

  router.push(`/esperando-aprobacion?id=${orderId}`);
};
</script>

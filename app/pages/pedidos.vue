<template>
  <section class="p-10">
    <h1 class="text-4xl font-bold mb-8 text-center">Tus Pedidos</h1>

    <div v-if="!user" class="text-center text-gray-500">
      Debes iniciar sesión para ver tus pedidos.
    </div>

    <div v-else-if="orders.length === 0" class="text-center text-gray-500">
      No has realizado pedidos todavía.
    </div>

    <div v-else class="space-y-10">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="bg-white shadow p-6 rounded-xl"
      >
        <h2 class="text-2xl font-bold mb-2">Pedido #{{ order.id }}</h2>
        <p class="text-gray-600 mb-4">Fecha: {{ order.fecha }}</p>

        <!-- Items del pedido -->
        <div class="space-y-4">
          <div 
            v-for="item in order.items" 
            :key="item.productId"
            class="border-b pb-3"
          >
            <p class="text-lg font-semibold">{{ item.titulo }}</p>
            <p class="text-gray-600">{{ item.artista }}</p>

            <p class="font-bold text-indigo-600">
              {{ item.precio }} COP
            </p>
          </div>
        </div>

        <p class="mt-4 text-xl font-bold">
          Total: {{ order.total }} COP
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { collection, getDocs, query, where } from "firebase/firestore";

const { user, loadingUser } = useCurrentUser();
const { $db } = useNuxtApp();

const orders = ref([]);

const loadOrders = async () => {
  if (!user.value) return;

  const q = query(
    collection($db, "orders"),
    where("userId", "==", user.value.uid)
  );

  const snap = await getDocs(q);
  orders.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

watch(user, () => {
  if (user.value) loadOrders();
});
</script>

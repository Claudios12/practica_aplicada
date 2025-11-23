<template>
  <section class="p-10">
    <h1 class="text-4xl font-bold mb-8 text-center">Tu Música Comprada</h1>

    <div v-if="!user" class="text-center text-gray-500">
      Debes iniciar sesión para ver tus canciones.
    </div>

    <div v-else-if="songs.length === 0" class="text-center text-gray-500">
      Todavía no has comprado canciones.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="song in songs"
        :key="song.productId"
        class="bg-white p-5 rounded-xl shadow-lg"
      >
        <h2 class="text-xl font-semibold mb-1">{{ song.titulo }}</h2>
        <p class="text-gray-600 mb-3">{{ song.artista }}</p>

        <audio controls class="w-full">
          <source :src="song.url" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, getDocs, query, where } from "firebase/firestore";
const { user, loadingUser } = useCurrentUser();
const { $db } = useNuxtApp();

const songs = ref([]);

const loadPurchasedSongs = async () => {
  if (!user.value) return; // usuario no listo

  const q = query(
    collection($db, "purchased_songs"),
    where("userId", "==", user.value.uid)
  );

  const snap = await getDocs(q);
  songs.value = snap.docs.map(d => d.data());
};

watch(user, () => {
  if (user.value) loadPurchasedSongs();
});
</script>
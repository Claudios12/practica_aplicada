import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export const useCurrentUser = () => {
  const { $auth } = useNuxtApp();
  const user = ref<User | null>(null);
  const loadingUser = ref(true);

  onMounted(() => {
    onAuthStateChanged($auth, (u) => {
      user.value = u;
      loadingUser.value = false;
    });
  });

  return { user, loadingUser };
};

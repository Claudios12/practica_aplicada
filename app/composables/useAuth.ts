import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth
} from "firebase/auth";

export const useAuth = () => {
  const user = ref<any>(null);
  const loading = ref(true);

  const { $auth } = useNuxtApp();
  const auth = $auth as Auth;

  onMounted(() => {
    if (auth) {
      onAuthStateChanged(auth, (u) => {
        user.value = u;
        loading.value = false;
      });
    }
  });

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { user, loading, login, register, logout };
};

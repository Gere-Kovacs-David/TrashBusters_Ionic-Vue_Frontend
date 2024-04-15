import { ref, Ref } from "vue";
import Cookies from "js-cookie";

// Define types for isLoggedIn and user
interface AuthState {
  isLoggedIn: Ref<boolean>;
  user: Ref<any>; // Change 'any' to a more specific type if possible
}

// Createafunction to nitialize auth state
function initializeAuthState(): AuthState {
  const isLoggedIn: Ref<boolean> = ref(false);

  if (Cookies.get("user") != null && Cookies.get("token") != null) {
    isLoggedIn.value = true;
  }

  const user: Ref<any> = ref(null); // Change 'any' to a more specific type if possible

  return {
    isLoggedIn,
    user
  };
}

// Export the initialized auth state
export default initializeAuthState();

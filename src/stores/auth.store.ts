import { authService } from "@/services/auth.service";
import type { AuthUser, LoginRequest } from "@/types/auth.types";
import { defineStore } from "pinia";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials: LoginRequest) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await authService.login(credentials);

        this.token = response.accessToken;
        this.user = {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          token: response.accessToken,
        };

        localStorage.setItem("authToken", response.accessToken);
        localStorage.setItem("authUser", JSON.stringify(this.user));

        return true;
      } catch (error: unknown) {
        this.error = error instanceof Error ? error.message : "Login failed";
        console.error("Login error:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      authService.logout();
      this.user = null;
      this.token = null;
      this.error = null;
    },

    initializeAuth() {
      const token = authService.getStoredToken();
      const user = authService.getStoredUser();

      if (token && user) {
        this.token = token;
        this.user = user;
      }
    },
  },
});

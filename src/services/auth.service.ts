import type { AuthResponse, AuthUser, LoginRequest } from "@/types/auth.types";
import { api } from "./api";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  },

  getStoredToken(): string | null {
    return localStorage.getItem("authToken");
  },

  getStoredUser(): AuthUser | null {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  },
};

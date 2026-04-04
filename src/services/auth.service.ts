import {
  isAuthUser,
  type AuthResponse,
  type AuthUser,
  type LoginRequest,
} from "@/types/auth.types";
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
    const raw = localStorage.getItem("authUser");
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isAuthUser(parsed)) return parsed;
    return null;
  },
};

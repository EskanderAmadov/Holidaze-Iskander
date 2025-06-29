import api from "../client";

export async function loginUser(credentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.errors?.[0]?.message || "Login failed");
  }
}
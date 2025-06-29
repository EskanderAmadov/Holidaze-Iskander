import api from "../client";

export async function registerUser(userData) {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.response?.data?.errors?.[0]?.message || "Your registration failed");
  }
}

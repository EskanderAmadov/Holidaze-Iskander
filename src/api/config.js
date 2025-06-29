export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_KEY = "6cb899ef-acec-411c-af3d-704699fcef5b"; 

export function getAuthToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken || null;
}

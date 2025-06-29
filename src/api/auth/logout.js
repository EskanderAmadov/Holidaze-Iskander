export function logoutUser() {
  localStorage.removeItem("user");
  console.log("User is now logged out.");
}

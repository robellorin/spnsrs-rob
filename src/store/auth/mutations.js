export function setAuthUser(state, authUser) {
  state.authUser = authUser;
  localStorage.setItem("authUser", JSON.stringify(authUser));
}

export function clearAuthUser(state) {
  state.authUser = null;
  localStorage.removeItem("authUser");
}

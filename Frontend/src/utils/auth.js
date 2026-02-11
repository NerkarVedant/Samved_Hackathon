import secureLocalStorage from "react-secure-storage";

export function generateFakeJWT(payload) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa("government-healthcare-secret");

  return `${header}.${body}.${signature}`;
}

export function setToken(token) {
  secureLocalStorage.setItem("auth_token", token);
}

export function getToken() {
  return secureLocalStorage.getItem("auth_token");
}

export function removeToken() {
  secureLocalStorage.removeItem("auth_token");
}

export function isAuthenticated() {
  return !!getToken();
}

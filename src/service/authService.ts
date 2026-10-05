import type {
  LoginRequest,
  TokenResponse,
  RegisterRequest,
} from "../types/authType";

// hämtar adressen till authservice
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

/* async då function behöver vänta på svar från backend */
export async function login(request: LoginRequest): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  //response.status är där för tillfället för utvecklingssyfte
  if (!response.ok) {
    throw new Error(`Inloggningen misslyckades. Status: ${response.status}`);
  }

  const data: TokenResponse = await response.json();

  //sparar jwt token för kommande autentiserade anrop
  sessionStorage.setItem(TOKEN_KEY, data.accessToken);

  //sparar övrig user data från auth service
  sessionStorage.setItem(
    USER_KEY,
    JSON.stringify({
      username: data.username,
      roles: data.roles,
      expiresIn: data.expiresIn,
    }),
  );

  return data;
}

/* tar emot en register request, 
anropar auth service, 
gör objektet till json från ts, kastar fel om response ej ok */
export async function register(
  request: RegisterRequest,
): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Registreringen misslyckades. Status: ${response.status}`);
  }

  const data: TokenResponse = await response.json();
  return data;
}

//kan hämta JWT senare
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

//hämtar användardata från sessionstorage
export function getCurrentUser() {
  const raw = sessionStorage.getItem(USER_KEY);

  //om raw innehåller något gör det till ett objekt annars null, parse behövs då det sparades som sträng
  return raw ? JSON.parse(raw) : null;
}

//loggar ut användaren genom att ta bort sparad auth data
export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

//kontrollerar om användaren är inloggad
export function isAuthenticated() {
  return getToken() !== null;
}

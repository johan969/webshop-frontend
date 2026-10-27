import type { LoginRequest, User, RegisterRequest } from "../types/authType";

// hämtar adressen till authservice
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const USER_KEY = "user";

/* async då function behöver vänta på svar från backend */
export async function login(request: LoginRequest): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",

    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(request),
  });

  //response.status är där för tillfället för utvecklingssyfte
  if (!response.ok) {
    throw new Error(`Inloggningen misslyckades. Status: ${response.status}`);
  }

  const data: User = await response.json();

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
export async function register(request: RegisterRequest): Promise<User> {
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

  const data: User = await response.json();
  return data;
}

//hämtar användardata från sessionstorage
export function getCurrentUser() {
  const raw = sessionStorage.getItem(USER_KEY);

  //om raw innehåller något gör det till ett objekt annars null, parse behövs då det sparades som sträng
  return raw ? JSON.parse(raw) : null;
}

//kontrollerar om användaren är inloggad
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

//loggar ut användaren genom att ta bort sparad auth data
export async function logout() {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Utloggningen misslyckades`);
  }

  sessionStorage.removeItem(USER_KEY);
}

//hämtar användardata från backend, returnerar null om ej inloggad

export async function getSession(): Promise<User | null> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error(
      `Kunde inte kontrollera inloggningen (${response.status}).`,
    );
  }
  return response.json();
}

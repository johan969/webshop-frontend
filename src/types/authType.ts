/*vad frontend skickar till backend */
export type LoginRequest = {
  username: string;
  password: string;
};

/*måste matcha dto från backend*/
export type TokenResponse = {
  accessToken: string;
  expiresIn: number;
  username: string;
  roles: string[];
};

/*använder ej loginrequest utifall vi vill göra tillägg som namn etc.
separat API-anrop alltså */
export type RegisterRequest = {
  username: string;
  password: string;
};

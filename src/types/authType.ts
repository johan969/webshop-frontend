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

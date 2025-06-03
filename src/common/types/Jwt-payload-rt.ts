interface JwtPayloadRt extends JwtPayload {
  refreshToken?: string;
} // opcjonalne, jeśli chcesz przechowywać refresh token w payload

// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode
import type { UserRole } from '../interfaces/types.ts';

interface DecodedToken {
  id: string;
  email: string;
  role: UserRole;
  exp: number; // Expiration time
}

export const getUserRole = (): UserRole | null => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Check for token expiration
        return decodedToken.role;
      } else {
        localStorage.removeItem('token'); // Remove expired token
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

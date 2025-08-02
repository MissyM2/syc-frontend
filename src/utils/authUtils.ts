// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode
import type { UserRole } from '../interfaces/types.ts';

interface DecodedToken {
  id: string;
  email: string;
  userName: string;
  userRole: UserRole;
  exp: number; // Expiration time
}

export const getUserRole = (): UserRole | null => {
  const token = sessionStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Check for token expiration
        return decodedToken.userRole;
      } else {
        sessionStorage.removeItem('userToken'); // Remove expired token
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

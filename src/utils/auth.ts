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
  console.log('inside getUserRole');
  const token = sessionStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        console.log('auth, getUserRole: decodedToken.id ' + decodedToken.id);
        console.log(
          'auth, getUserRole: decodedToken.email ' + decodedToken.email
        );
        console.log(
          'auth, getUserRole: decodedToken.userName ' + decodedToken.userName
        );
        console.log('auth, getUserRole: decodedToken.exp ' + decodedToken.exp);

        console.log(
          'auth, getUserRole: decodedToken.userRole ' + decodedToken.userRole
        );
        // Check for token expiration
        return decodedToken.userRole;
      } else {
        sessionStorage.removeItem('token'); // Remove expired token
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

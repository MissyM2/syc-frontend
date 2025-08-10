export const UserRole = {
  Admin: 'admin',
  User: 'user',
  Guest: 'guest',
} as const;

export interface Option {
  id: string;
  value: string;
  label: string;
}

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

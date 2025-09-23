// lib/types.ts

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  // If your login API returns a phone number, add it here
  phoneNumber?: string;
}
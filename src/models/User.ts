export type UserRole = 'client' | 'admin';

export interface User {
  uid: string;       // Firestore docId
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string; // ISO string
}







export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  lastSignIn: number | null;
  signInCount: number;
  profileImageUrl: string | null;
  emailVerified: boolean;
  showPreloader: boolean;
  createdAt: number;
};

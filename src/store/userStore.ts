import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Gender, SocialStatus, User, UserVersion } from '@/domain/types';

function uuid(): string {
  return crypto.randomUUID();
}

function deriveVersion(
  status: SocialStatus | null,
  age: number | null,
): UserVersion {
  if (status === 'student') return 'student';
  if (status === 'school') return 'school';
  if (age != null && age >= 18) return 'student';
  return 'school';
}

interface ProfileInput {
  name?: string;
  age?: number | null;
  gender?: Gender | null;
  socialStatus?: SocialStatus | null;
  expectations?: string[];
}

interface UserState {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  setProfile: (data: ProfileInput) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      login: (email) =>
        set({
          user: {
            id: uuid(),
            email,
            name: '',
            age: null,
            gender: null,
            socialStatus: null,
            userVersion: 'school',
            expectations: [],
            onboardingComplete: false,
            createdAt: new Date().toISOString(),
          },
        }),

      logout: () => set({ user: null }),

      setProfile: (data) =>
        set((state) => {
          if (!state.user) return state;
          const merged: User = { ...state.user, ...data } as User;
          merged.userVersion = deriveVersion(
            merged.socialStatus,
            merged.age,
          );
          return { user: merged };
        }),

      completeOnboarding: () =>
        set((state) =>
          state.user
            ? { user: { ...state.user, onboardingComplete: true } }
            : state,
        ),
    }),
    { name: 'talentlab:user' },
  ),
);

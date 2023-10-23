import { create } from "zustand";

type State = {
  isAnon: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  makeAnon: () => void;
  unMakeAnon: () => void;
};

export const useAnonUser = create<State>((set) => ({
  isAnon: false,
  token: '',
  setToken: (token: string | null) => set({ token }),
  makeAnon: () => set({ isAnon: true }),
  unMakeAnon: () => set({ isAnon: false }),
}));
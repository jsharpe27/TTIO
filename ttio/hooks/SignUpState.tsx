import { create } from "zustand";

type State = {
  email: string
};

export const useSignUpState = create<State>((set) => ({
  email: ""
}));
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IPreferences {
  theme: string;
}

interface IApp {
  isLoading: boolean;
  isNavbarOpen: boolean;
  isSettingsDrawerOpen: boolean;
  registerUserActiveStep: number;
}

export interface IUser {
  email: string | null;
  imageUrl: string | null;
  name: string | null;
  registerComplete: boolean | null;
  uid: string | null;
  grossIncome: number | null;
}

interface IGlobalStateValues {
  preferences: IPreferences;
  app: IApp;
  user: IUser;
}

export interface IGlobalState extends IGlobalStateValues {
  setPreferences: (state: Partial<IPreferences>) => void;
  setApp: (state: Partial<IApp>) => void;
  setUser: (state: Partial<IUser>) => void;
  clearState: () => void;
}

export const initialState: IGlobalStateValues = {
  app: {
    isLoading: false,
    isNavbarOpen: false,
    isSettingsDrawerOpen: false,
    registerUserActiveStep: 0,
  },
  user: {
    email: null,
    name: null,
    uid: null,
    imageUrl: null,
    registerComplete: false,
    grossIncome: null,
  },
  preferences: {
    theme: "system",
  },
};

const useGlobalStore = create<IGlobalState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setPreferences: (newPreferences): void => {
          set((state) => ({
            preferences: {
              ...state.preferences,
              ...newPreferences,
            },
          }));
        },
        setUser: (newUser): void => {
          set((state) => ({
            user: {
              ...state.user,
              ...newUser,
            },
          }));
        },
        setApp: (newApp): void => {
          set((state) => ({
            app: {
              ...state.app,
              ...newApp,
            },
          }));
        },
        setState: (newState: IGlobalState | Partial<IGlobalState>): void => {
          set((state) => ({ ...state, ...newState }));
        },
        clearState: (): void => {
          set({ ...initialState });
        },
      }),
      {
        name: "global-store",
      }
    )
  )
);

export default useGlobalStore;

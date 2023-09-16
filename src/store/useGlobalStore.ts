import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Database } from "../../types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { showNotification } from "@mantine/notifications";

export type IDatabaseTransactions =
  Database["public"]["Tables"]["transactions"]["Row"];

interface IPreferences {
  theme: string;
}

interface IApp {
  isLoading: boolean;
  isLoadingTransactions: boolean;
  isNavbarOpen: boolean;
  isSettingsDrawerOpen: boolean;
  registerUserActiveStep: number;
}

// interface ITransactions {
//   id: string;
//   createdAt: string;
//   amount: number;
//   description: string;
//   dueDate: string;
// }

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
  transactions: IDatabaseTransactions[];
}

export interface IGlobalState extends IGlobalStateValues {
  setPreferences: (state: Partial<IPreferences>) => void;
  setApp: (state: Partial<IApp>) => void;
  setUser: (state: Partial<IUser>) => void;
  setTransactions: (state: IDatabaseTransactions[]) => void;
  fetchTransactions: ({
    supabase,
  }: {
    supabase: SupabaseClient<Database>;
  }) => void;
  clearState: () => void;
}

export const initialState: IGlobalStateValues = {
  app: {
    isLoading: false,
    isLoadingTransactions: false,
    isNavbarOpen: false,
    isSettingsDrawerOpen: false,
    registerUserActiveStep: 0,
  },
  transactions: [],
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
        fetchTransactions: async ({ supabase }): Promise<void> => {
          set(() => ({
            app: {
              ...initialState.app,
              isLoadingTransactions: true,
            },
          }));

          const { data, error } = await supabase
            .from("transactions")
            .select("*");

          if (error) {
            return showNotification({
              title: "Error",
              message: error.message,
            });
          }

          set(() => ({
            transactions: data,
            app: {
              ...initialState.app,
              isLoadingTransactions: false,
            },
          }));
        },
        setPreferences: (newPreferences): void => {
          set((state) => ({
            preferences: {
              ...state.preferences,
              ...newPreferences,
            },
          }));
        },
        setTransactions: (newTransactions): void => {
          set(() => ({
            transactions: newTransactions,
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

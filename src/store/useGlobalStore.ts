import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Database } from "../../types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { showNotification } from "@mantine/notifications";

export type IDatabaseTransactions =
  Database["public"]["Tables"]["transactions"]["Row"];
export type IDatabaseCategories =
  Database["public"]["Tables"]["categories"]["Row"];

interface IPreferences {
  theme: string;
}

interface IApp {
  isLoading: boolean;
  isLoadingTransactions: boolean;
  isLoadingCategories: boolean;
  isNavbarOpen: boolean;
  isSettingsDrawerOpen: boolean;
  registerUserActiveStep: number;
}

interface ITransactions extends IDatabaseTransactions {
  amount: number;
  category: IDatabaseCategories;
}

interface IMeta {
  totalExpenses: number;
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
  meta: IMeta;
  transactions: ITransactions[];
  categories: IDatabaseCategories[];
}

export interface IGlobalState extends IGlobalStateValues {
  setMeta: (state: Partial<IMeta>) => void;
  setPreferences: (state: Partial<IPreferences>) => void;
  setApp: (state: Partial<IApp>) => void;
  setUser: (state: Partial<IUser>) => void;
  setTransactions: (state: ITransactions[]) => void;
  setCategories: (state: IDatabaseCategories[]) => void;
  fetchTransactions: ({
    supabase,
  }: {
    supabase: SupabaseClient<Database>;
  }) => void;
  fetchCategories: ({
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
    isLoadingCategories: false,
    isNavbarOpen: false,
    isSettingsDrawerOpen: false,
    registerUserActiveStep: 0,
  },
  meta: {
    totalExpenses: 0,
  },
  categories: [],
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
          const { data, error } = await supabase
            .from("transactions")
            .select("*, category:category_id(*)")
            .order("created_at", { ascending: false });

          if (error) {
            return showNotification({
              title: "Error",
              message: error.message,
            });
          }

          set((state) => ({
            app: {
              ...state.app,
              isLoadingTransactions: false,
            },
            transactions: data, // Dont remove this the error is ok
          }));
        },
        setMeta(newState) {
          set((state) => ({
            meta: {
              ...state.meta,
              ...newState,
            },
          }));
        },

        fetchCategories: async ({ supabase }): Promise<void> => {
          set((state) => ({
            app: {
              ...state.app,
              isLoadingCategories: true,
            },
          }));

          const { data, error } = await supabase
            .from("categories")
            .select(
              "*, transactions:transactions_id(*), transactions:category_id(*)"
            )
            .order("created_at", { ascending: false });

          if (error) {
            return showNotification({
              title: "Error",
              message: error.message,
            });
          }

          set((state) => ({
            categories: data,
            app: {
              ...state.app,
              isLoadingCategories: false,
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
        setCategories: (newCategories): void => {
          set(() => ({
            categories: newCategories,
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

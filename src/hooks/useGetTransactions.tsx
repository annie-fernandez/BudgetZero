import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Database } from "../../types/database.types";
import useGlobalStore from "../store/useGlobalStore";

const useGetTransactions = () => {
  const supabase = useSupabaseClient<Database>();

  const {
    user,
    fetchTransactions,
    fetchCategories,
    fetchCategoriesWithTransactions,
  } = useGlobalStore();

  useEffect(() => {
    fetchTransactions({ supabase });
    fetchCategories({ supabase });
    fetchCategoriesWithTransactions({ supabase });
  }, [user]);
};

export default useGetTransactions;

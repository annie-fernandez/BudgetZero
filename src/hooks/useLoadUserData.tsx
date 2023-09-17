import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useCallback, useEffect } from "react";
import { Database } from "../../types/database.types";
import useGlobalStore from "../store/useGlobalStore";
import useHandleSignout from "./useHandleSignout";

const useLoadUserData = () => {
  const supabase = useSupabaseClient<Database>();
  const { handleSignout } = useHandleSignout();
  const s = useSession();

  const { setUser, setApp, clearState } = useGlobalStore();

  const getUserSession = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return handleSignout();

    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = useCallback(async (session: Session): Promise<void> => {
    if (!session) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error || !data) {
      setApp({
        isLoading: false,
      });

      setUser({
        registerComplete: false,
        uid: null,
      });

      return;
    }

    setUser({
      name: data?.name,
      email: data?.email,
      imageUrl: data?.image_url,
      registerComplete: data?.register_complete,
      uid: data?.id,
      grossIncome: data?.gross_income,
      tax: data.tax,
    });

    setApp({
      isLoading: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!s) {
      clearState();
      return;
    }

    setApp({
      isLoading: true,
    });

    Promise.all([getUserData(s), getUserSession()]).finally(() => {
      setApp({ isLoading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, supabase]);

  return { getUserData, getUserSession };
};

export default useLoadUserData;

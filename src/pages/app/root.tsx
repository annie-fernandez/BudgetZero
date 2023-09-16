import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthUser from "../../components/AuthUser/AuthUser";
import Shell from "./AppShell/AppShell";
import useGlobalStore from "../../store/useGlobalStore";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import useLoadUserData from "../../hooks/useLoadUserData";
import useGetTransactions from "../../hooks/useGetTransactions";

const Root = (): JSX.Element => {
  useLoadUserData();
  useGetTransactions();

  const location = useLocation();
  const session = useSession();

  const { user } = useGlobalStore();

  useEffect(() => {
    if (!session) return;
    if (!location) return;

    // handle clearing local state on logout

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, session]);

  if (!session) {
    return <AuthUser />;
  }

  if (session && !user.registerComplete) {
    return <RegisterUser />;
  }

  return <Shell />;
};

export default Root;

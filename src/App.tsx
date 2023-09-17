/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider, openModal } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Plus, Search } from "react-feather";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import AddTransactionModal from "./components/TransactionHistory/AddTransactionModal/AddTransactionModal";
import constants from "./constants/constants";
import { formatToUSD } from "./helpers/formatToTwoDecimalPlaces";
import Error404 from "./pages/404/Error404";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import History from "./pages/app/History/History";
import Root from "./pages/app/root";
import LandingPage from "./pages/landingPage/LandingPage";
import useGlobalStore from "./store/useGlobalStore";

const supabase = createClient(
  constants.supabaseUrl || "",
  constants.supabaseAnonKey || ""
);

function App() {
  const colorScheme = useColorScheme();
  const { preferences, transactions } = useGlobalStore();
  const [actions, setActions] = useState<SpotlightAction[]>([]);

  const addNewTransactionAction: SpotlightAction = {
    title: "Create new transaction",
    description: "Create a new transaction",
    icon: <Plus size={16} />,
    onTrigger: () => {
      openModal({
        title: "Create new transaction",
        children: <AddTransactionModal />,
        overlayProps: {
          blur: 5,
        },
      });
    },
  };

  useEffect(() => {
    if (transactions.length > 0) {
      const actions = transactions.map((transaction) => {
        return {
          title: `${transaction.name} - ${formatToUSD(transaction.amount)}`,
          description: `${transaction.description}`,
          onTrigger: () =>
            openModal({
              title: "Edit Transaction",
              children: <AddTransactionModal transaction={transaction} />,
              overlayProps: {
                blur: 5,
              },
            }),
        };
      });

      setActions([addNewTransactionAction, ...actions]);
    }

    if (transactions.length === 0) {
      const actions: SpotlightAction[] = [addNewTransactionAction];

      setActions(actions);
    }
  }, [transactions]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <Error404 />,
    },
    {
      path: "/app",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "/app/",
          element: <Dashboard />,
        },
        {
          path: "/app/history",
          element: <History />,
        },
      ],
    },
  ]);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <MantineProvider
        theme={{
          // @ts-ignore
          colorScheme:
            preferences.theme === "system" ? colorScheme : preferences.theme,
          primaryColor: "cyan",
          defaultRadius: "md",
          colors: {
            // override dark colors to change them for all components
            dark: [
              "#c2c2c2",
              "#a7a7a7",
              "#7e7e7e",
              "#636363",
              "#474747",
              "#3f3f3f",
              "#202020",
              "#1a1a1a",
              "#141414",
              "#111111",
            ],
          },
          components: {
            Button: {
              defaultProps: {
                size: "xs",
                color: "cyan",
              },
            },
            Modal: {
              defaultProps: {
                overlayBlur: 5,
                overlayColor: "gray",
              },
            },
            Drawer: {
              defaultProps: {
                overlayBlur: 5,
                overlayColor: "gray",
              },
            },
          },
        }}
        withGlobalStyles
      >
        <Notifications />
        <ModalsProvider>
          <SpotlightProvider
            actions={actions}
            searchIcon={<Search size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut="mod + shift + k"
            nothingFoundMessage="Nothing found..."
          >
            <RouterProvider router={router} />
            <LoadingOverlay />
          </SpotlightProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
}

export default App;

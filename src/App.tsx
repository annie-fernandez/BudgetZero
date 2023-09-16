/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error404 from "./pages/404/Error404";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import useGlobalStore from "./store/useGlobalStore";
import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import { createClient } from "@supabase/supabase-js";
import constants from "./constants/constants";
import Root from "./pages/app/root";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import History from "./pages/app/History/History";

const supabase = createClient(
  constants.supabaseUrl || "",
  constants.supabaseAnonKey || ""
);

function App() {
  const colorScheme = useColorScheme();
  const { preferences } = useGlobalStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/history",
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
          primaryColor: "red",
          defaultRadius: "xs",
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
                color: "red",
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
          <RouterProvider router={router} />
          <LoadingOverlay />
        </ModalsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
}

export default App;

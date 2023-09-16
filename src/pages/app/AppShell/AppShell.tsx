import { AppShell, useMantineTheme } from "@mantine/core";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { Outlet } from "react-router";

export default function Shell() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar />}
      header={<Header />}
    >
      <Outlet />
    </AppShell>
  );
}

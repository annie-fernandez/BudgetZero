import { AppShell, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router";
import Header from "../../../components/Header/Header";

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
      header={<Header />}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <Outlet />
      </div>
    </AppShell>
  );
}

import { Navbar as MantineNavbar, NavLink } from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";

const Navbar = () => {
  const {
    app: { isNavbarOpen },
  } = useGlobalStore();

  return (
    <MantineNavbar
      p={0}
      hiddenBreakpoint="sm"
      hidden={!isNavbarOpen}
      width={{ sm: 200, lg: 300 }}
    >
      <NavLink label="First child link" />
      <NavLink label="Second child link" />
    </MantineNavbar>
  );
};

export default Navbar;

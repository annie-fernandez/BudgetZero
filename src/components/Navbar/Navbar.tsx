import { Navbar as MantineNavbar, NavLink } from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <NavLink label="Dashboard" />
      </Link>
      <Link to="/history">
        <NavLink label="History" />
      </Link>
    </MantineNavbar>
  );
};

export default Navbar;

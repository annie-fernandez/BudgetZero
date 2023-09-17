import {
  ActionIcon,
  Center,
  Flex,
  Input,
  Header as MantineHeader,
  Text,
  createStyles,
} from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";
import SettingsDrawer from "../SettingsDrawer/SettingsDrawer";
import { Settings } from "react-feather";
import { IconSearch } from "@tabler/icons-react";
import { spotlight } from "@mantine/spotlight";
import { Link } from "react-router-dom";

const useStyles = createStyles(() => ({
  logo: {
    height: 50,
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const { theme } = useStyles();

  const { setApp } = useGlobalStore();

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <Flex
        style={{ height: "100%" }}
        align={"center"}
        justify={"space-between"}
      >
        <Link to="/app">
          <Flex align={"center"}>
            <img className={classes.logo} src="/logo.png" />
            <Text
              style={{
                textDecoration: "none",
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
              }}
              underline={false}
              ml={-10}
            >
              BudgetZero
            </Text>
          </Flex>
        </Link>

        <Flex align={"center"}>
          <Center>
            <Input
              style={{ cursor: "pointer" }}
              icon={<IconSearch size={10} />}
              placeholder="Search"
              size={"xs"}
              readOnly
              onClick={() => spotlight.open()}
            />
          </Center>
          <ActionIcon
            onClick={() => {
              setApp({ isSettingsDrawerOpen: true });
            }}
          >
            <Settings size={16} style={{ marginLeft: 4 }} />
          </ActionIcon>
        </Flex>
      </Flex>
      <SettingsDrawer />
    </MantineHeader>
  );
};

export default Header;

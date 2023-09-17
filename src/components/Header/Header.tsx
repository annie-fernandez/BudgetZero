import {
  ActionIcon,
  Flex,
  Header as MantineHeader,
  MediaQuery,
  Text,
  createStyles,
} from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";
import SettingsDrawer from "../SettingsDrawer/SettingsDrawer";
import { Settings } from "react-feather";

const useStyles = createStyles(() => ({
  logo: {
    height: 50,
  },
}));

const Header = () => {

  const { classes } = useStyles();

  const {
    setApp,
  } = useGlobalStore();

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <SettingsDrawer />
      <Flex style={{ height: "100%" }} align="center" justify="space-between">
        <div>
          <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <Flex align="center">
              <img className={classes.logo} src="/logo.png" />
              <Text ml={-10}>BudgetZero</Text>
            </Flex>
          </MediaQuery>
        </div>
        <ActionIcon
          onClick={() => {
            setApp({ isSettingsDrawerOpen: true });
          }}
        >
          <Settings size={16} />
        </ActionIcon>
      </Flex>
    </MantineHeader>
  );
};

export default Header;

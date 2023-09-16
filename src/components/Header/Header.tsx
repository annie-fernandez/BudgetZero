import {
  ActionIcon,
  Burger,
  Flex,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";
import SettingsDrawer from "../SettingsDrawer/SettingsDrawer";
import { Settings } from "react-feather";

const Header = () => {
  const theme = useMantineTheme();

  const {
    app: { isNavbarOpen },
    setApp,
  } = useGlobalStore();

  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <SettingsDrawer />
      <Flex style={{ height: "100%" }} align="center" justify="space-between">
        <div>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={isNavbarOpen}
              onClick={() =>
                setApp({
                  isNavbarOpen: !isNavbarOpen,
                })
              }
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Text>BudgetZero</Text>
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

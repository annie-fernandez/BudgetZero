import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Flex,
  Popover,
  Select,
} from "@mantine/core";
import useGlobalStore from "../../store/useGlobalStore";
import { LogOut } from "react-feather";
import useHandleSignout from "../../hooks/useHandleSignout";

const SettingsDrawer = () => {
  const {
    setApp,
    user,
    app: { isSettingsDrawerOpen },
    setPreferences,
  } = useGlobalStore();

  const { handleSignout, isLoadingSignout } = useHandleSignout();

  return (
    <Drawer
      opened={isSettingsDrawerOpen}
      onClose={() => setApp({ isSettingsDrawerOpen: false })}
      title="Settings"
      position="right"
      overlayProps={{
        blur: 5,
      }}
    >
      <Flex
        style={{ height: "100%" }}
        direction="column"
        justify="space-between"
      >
        <div>
          <Flex>
            <Avatar mr={10} src={user.imageUrl} size={120} />
            <div>
              <h1>{user.name}</h1>
              <h5>{user.email}</h5>
            </div>
          </Flex>

          <Select
            mt={30}
            data={[
              { value: "system", label: "System Default" },
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
            ]}
            label="Select the App's theme"
            onChange={(value): void => {
              if (!value) return;

              setPreferences({
                theme: value,
              });
            }}
            placeholder="Dark's better..."
            withinPortal
          />
        </div>
        <Divider mb={10} mt={30} />

        <Popover width={300} withArrow withinPortal>
          <Popover.Target>
            <Button mt={20} rightIcon={<LogOut size={16} />} color="red">
              Sign out
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <h5>Are you sure?</h5>
            <Flex justify="space-between" gap={10} mt={10}>
              <Button variant="light" fullWidth>
                No
              </Button>
              <Button
                loading={isLoadingSignout}
                onClick={() => handleSignout()}
                color="red"
                fullWidth
              >
                {isLoadingSignout ? "Signing out..." : "Yes, sign out"}
              </Button>
            </Flex>
          </Popover.Dropdown>
        </Popover>
      </Flex>
    </Drawer>
  );
};

export default SettingsDrawer;

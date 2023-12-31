import { Alert, Button, Card, HoverCard, useMantineTheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { Database } from "../../../types/database.types";
import useGlobalStore from "../../store/useGlobalStore";
import styles from "./AuthUser.module.css";

const AuthUser = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const theme = useMantineTheme();
  const { preferences } = useGlobalStore();
  const colorScheme = useColorScheme();

  const [isLoadingDemoSignup, setIsLoadingDemoSignup] = useState(false);

  const handleDemoSignup = async () => {
    setIsLoadingDemoSignup(true);

    const { error } = await supabase.auth.signUp({
      email: `${Math.random().toString(36).substring(2, 15)}@demo.com`,
      password: "123456",
    });

    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });

      setIsLoadingDemoSignup(false);
    }
  };

  return (
    <Card className={styles.container} withBorder>
      <h1>Account.</h1>
      <Auth
        appearance={{
          theme: ThemeSupa,

          variables: {
            default: {
              colors: {
                brand: theme.colors.cyan[6],
                brandAccent: theme.colors.cyan[7],
              },
            },
          },
        }}
        providers={["github", "discord"]}
        redirectTo="/"
        socialLayout="vertical"
        supabaseClient={supabase}
        theme={preferences.theme === "system" ? colorScheme : preferences.theme}
      />

      <Alert mt={10} title="Don't want to create an account?">
        <p>Sign up with a demo account to explore the app</p>
        <HoverCard withArrow withinPortal width={300}>
          <HoverCard.Target>
            <Button
              onClick={() => handleDemoSignup()}
              loading={isLoadingDemoSignup}
              fullWidth
              mt={20}
            >
              Skip signup
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <p>
              You will be signed up with a randomly generated email, and your
              password will be &quote;123456&quot;
            </p>
          </HoverCard.Dropdown>
        </HoverCard>
      </Alert>
    </Card>
  );
};

export default AuthUser;

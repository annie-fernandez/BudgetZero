import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: rem(2),
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function Jumbo() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Keep your overspending at{" "}
              <span className={classes.highlight}>Zero</span>
            </Title>
            <Text color="dimmed" mt="md">
              Regain control of your finances by adhering to your budgets, we
              simplify the process for you!
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Enhenced User Experience</b> – smooth and simple User
                Interface
              </List.Item>
              <List.Item>
                <b>Spotlight Search</b> – search for transactions by price,
                ammount, description, or name
              </List.Item>
              <List.Item>
                <b>Strong Visuals </b> – illustrated history by charts and
                tables
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to="/app">
                <Button radius="xl" size="md" className={classes.control}>
                  Login
                </Button>
              </Link>
              <a href="https://github.com/annie-fernandez/BudgetZero">
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Source code
                </Button>
              </a>
            </Group>
          </div>
          <Image src="/jumbo.svg" className={classes.image} />
        </div>
      </Container>
    </div>
  );
}

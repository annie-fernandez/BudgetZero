import { createStyles, Text, SimpleGrid, Container, rem } from "@mantine/core";
import { DollarSign, Lock, PieChart } from "react-feather";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: rem(100),
    width: rem(160),
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

export function Features() {
  const { classes, cx } = useStyles();

  return (
    <Container mt={100} mb={30} size="lg">
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        <div className={cx(classes.feature)}>
          <div className={classes.overlay} />

          <div className={classes.content}>
            <Lock size={28} className={classes.icon} />
            <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
              Security
            </Text>
            <Text c="dimmed" fz="sm">
              Secure user registration and login processes, with multiple sign
              in options for a safe authentication
            </Text>
          </div>
        </div>
        <div className={cx(classes.feature)}>
          <div className={classes.overlay} />

          <div className={classes.content}>
            <PieChart size={28} className={classes.icon} />
            <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
              Graphs and Charts
            </Text>
            <Text c="dimmed" fz="sm">
              Illustrates your expense journey through visually appealing charts
              to track spending patterns over time.
            </Text>
          </div>
        </div>
        <div className={cx(classes.feature)}>
          <div className={classes.overlay} />

          <div className={classes.content}>
            <DollarSign size={28} className={classes.icon} />
            <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
              Income and Expense Tracking
            </Text>
            <Text c="dimmed" fz="sm">
              Categorize and analyze expenses into specific categories to help
              users understand where their money is going.
            </Text>
          </div>
        </div>
      </SimpleGrid>
    </Container>
  );
}

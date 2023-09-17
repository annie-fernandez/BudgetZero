import {
  createStyles,
  Title,
  Container,
  Accordion,
  ThemeIcon,
  MantineProvider,
  getStylesRef,
  rem,
  Box,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    minHeight: rem(820),
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][6]
    } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    position: "relative",
    color: theme.black,
  },

  title: {
    color: theme.white,
    fontSize: 52,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    backgroundColor: theme.white,
    borderBottom: 0,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    overflow: "hidden",
  },

  control: {
    fontSize: theme.fontSizes.lg,
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    color: theme.black,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  content: {
    paddingLeft: theme.spacing.xl,
    lineHeight: 1.6,
    color: theme.black,
  },

  icon: {
    ref: getStylesRef("icon"),
    marginLeft: theme.spacing.md,
  },

  gradient: {
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][6]
    } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
  },

  itemOpened: {
    [`& .${getStylesRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  button: {
    display: "block",
    marginTop: theme.spacing.md,

    [theme.fn.smallerThan("sm")]: {
      display: "block",
      width: "100%",
    },
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function Faq() {
  const { classes } = useStyles();
  return (
    <>
      <Box mt={200} />
      <MantineProvider inherit theme={{ colorScheme: "light" }}>
        <div className={classes.wrapper}>
          <Container mt={50} mb={50} size="sm">
            <Title align="center" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="budget-app"
              chevronSize={50}
              variant="separated"
              disableChevronRotation
              chevron={
                <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                  <IconPlus size="1.05rem" stroke={1.5} />
                </ThemeIcon>
              }
            >
              <Accordion.Item className={classes.item} value="budget-app">
                <Accordion.Control>
                  What is BudgetZero, and why should I use it?
                </Accordion.Control>
                <Accordion.Panel>
                  BudgetZero is a tool designed to help individuals manage their
                  finances effectively. It allows you to track income, expenses,
                  and financial goals, making budgeting easier and more
                  efficient. By using BudgetZero, you can gain better control
                  over your finances, analyze spending habits, save money, and
                  work towards achieving your financial objectives.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="secure">
                <Accordion.Control>
                  Will my financial data be secure?
                </Accordion.Control>
                <Accordion.Panel>
                  At BudgetZero, the security of your financial data is a top
                  priority. We've implemented robust security measures,
                  including authentication providers like GitHub and Discord, to
                  ensure the protection of your data. Additionally, our use of
                  row-level security policies in our PostgreSQL database
                  guarantees data privacy and security among users.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Can I set up recurring expenses and income sources?
                </Accordion.Control>
                <Accordion.Panel>
                  Absolutely! With BudgetZero, setting up recurring expenses is
                  simple and convenient. Our platform automates the tracking of
                  regular bills and other financial transactions, streamlining
                  your budgeting process. This feature helps you stay organized
                  and ensures that your financial records remain up-to-date
                  without the need for manual data entry each time.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Can I customize my budget categories and labels?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, you have complete flexibility to customize your budget
                  categories and labels with BudgetZero. We understand that
                  everyone's financial situation is unique, which is why our app
                  allows you to tailor the experience to your specific needs.
                  This customization ensures that your budget reflects your
                  individual spending patterns and financial objectives
                  accurately.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>
                  What should I do if I receive income irregularly (e.g.,
                  freelancers, gig workers)
                </Accordion.Control>
                <Accordion.Panel>
                  Managing irregular income is a common challenge, and
                  BudgetZero is here to assist you. To adapt to fluctuating
                  income, consider averaging your earnings based on historical
                  data, helping you create a more accurate monthly budget. With
                  our app's flexible features, you can also adjust your budget
                  as your income fluctuates, allowing you to maintain financial
                  stability and effectively work towards your financial goals.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </div>
      </MantineProvider>
    </>
  );
}

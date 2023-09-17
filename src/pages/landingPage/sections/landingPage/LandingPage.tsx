import {
  Container,
  Header,
  createStyles,
  rem,
  Flex,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  logo: {
    height: 50,
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

function LandingPage() {
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Container>
        <div className={classes.inner}>
          <Flex align="center">
            <img className={classes.logo} src="/logo.png" />
            <Text ml={-10}>BudgetZero</Text>
          </Flex>
        </div>
      </Container>
    </Header>
  );
}

export default LandingPage;

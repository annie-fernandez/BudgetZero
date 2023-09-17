import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Tooltip,
  createStyles,
  rem,
} from "@mantine/core";
import { IconArrowDownLeft } from "@tabler/icons-react";
import { formatToUSD } from "../../helpers/formatToTwoDecimalPlaces";
import useGlobalStore from "../../store/useGlobalStore";
import { Edit } from "react-feather";
import { openModal } from "@mantine/modals";
import EditSalaryAndTaxInformation from "../EditSalaryAndTaxModal/EditSalaryAndTaxModal";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: `${rem(3)} solid`,
    paddingBottom: rem(5),
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

export default function IncomeStat() {
  const { classes } = useStyles();

  const {
    user: { grossIncome, tax },
  } = useGlobalStore();

  if (!grossIncome || !tax) return null;

  const taxRate = 1 - tax / 100;

  const yearlyNetIncome = taxRate * (grossIncome / 12) * 12;

  const monthlyGrossIncome = grossIncome / 12;
  const monthlyNetIncome = (grossIncome / 12) * taxRate;
  const byweekly = (grossIncome / 24) * taxRate;

  const data = [
    {
      label: "Monthly Gross Income",
      count: formatToUSD(monthlyGrossIncome),
      color: "#15aabf",
    },
    {
      label: "Monthly Net Income",
      count: formatToUSD(monthlyNetIncome),
      color: "#03141a",
    },
    {
      label: "Biweekly Net Income",
      count: formatToUSD(byweekly),
      color: "#03141a",
    },
  ];

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text fw={700}>{stat.count}</Text>
      </Group>
    </Box>
  ));

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Text size={32}>Salary Insights</Text>
        <Tooltip withArrow withinPortal label="Edit salary and tax information">
          <ActionIcon
            onClick={() => {
              openModal({
                title: "Edit Salary and Tax Information",
                children: <EditSalaryAndTaxInformation />,
                overlayProps: {
                  blur: 5,
                },
              });
            }}
          >
            <Edit size={14} />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <Flex direction={"column"}>
            <Group spacing={"xl"} mb={10}>
              <Flex direction={"column"}>
                <Text fz="xl" fw={700}>
                  {formatToUSD(grossIncome)}
                </Text>
                <Text c="dimmed" fz="sm">
                  Yearly Gross Income
                </Text>
              </Flex>
            </Group>
            <Group align="flex-end" spacing="xs">
              <Text fz="xl" fw={700}>
                {formatToUSD(yearlyNetIncome)}
              </Text>
              <Text c="red" className={classes.diff} fz="sm" fw={700}>
                <span>{tax}%</span>
                <IconArrowDownLeft
                  size="1rem"
                  style={{ marginBottom: rem(4) }}
                  stroke={1.5}
                />
              </Text>
            </Group>
          </Flex>
        </Group>

        <Text c="dimmed" fz="sm">
          Your Net Income and Estimated Tax Reduction
        </Text>
        <SimpleGrid
          cols={3}
          breakpoints={[{ maxWidth: "xs", cols: 1 }]}
          mt="xl"
        >
          {descriptions}
        </SimpleGrid>
      </Paper>
    </div>
  );
}

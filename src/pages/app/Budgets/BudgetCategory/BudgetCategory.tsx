import { useEffect, useState } from "react";
import { ICategoryWithTransactions } from "../../../../store/useGlobalStore";
import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Paper,
  Progress,
  createStyles,
  rem,
} from "@mantine/core";
import {
  formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../../helpers/formatToTwoDecimalPlaces";
import { AlertTriangle, Plus } from "react-feather";
import { openModal } from "@mantine/modals";
import SetupSpendingBudget from "../SetupSpendingBudget/SetupSpendingBudget";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: `${rem(1)} solid`,
    paddingBottom: rem(1),
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

const BudgetCategory = ({
  category,
}: {
  category: ICategoryWithTransactions;
}) => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalSpentPercent, setTotalSpentPercent] = useState(0);

  useEffect(() => {
    const total = category.transactions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    const totalSpentPercent = (total / (category.budget || 0)) * 100;

    setTotalSpent(total);
    setTotalSpentPercent(totalSpentPercent);
  }, [category.transactions]);

  const renderRightComponent = () => {
    if (category.budget === null) {
      return (
        <Button
          onClick={() => {
            openModal({
              title: `Set spending for the ${category.name} category`,
              children: <SetupSpendingBudget category={category} />,
              overlayProps: {
                blur: 5,
              },
              size: "lg",
            });
          }}
          leftIcon={<Plus size={14} />}
          mt={10}
        >
          Set spending target
        </Button>
      );
    }

    return (
      <>
        <Progress
          mt={10}
          value={totalSpentPercent > 100 ? 100 : totalSpentPercent}
          label={`${formatToTwoDecimalPlaces(totalSpentPercent)}%`}
          size="xl"
          radius="xl"
        />
        {totalSpentPercent > 100 && (
          <Alert
            mt={20}
            icon={<AlertTriangle size={14} />}
            color="red"
            title="You are over budget"
          >
            You are {formatToUSD(totalSpent - category.budget)} over budget.
          </Alert>
        )}
      </>
    );
  };

  return (
    <Paper p={15} withBorder>
      <h3>
        Category: <Badge>{category.name}</Badge>
      </h3>
      <Divider mt={10} />
      <Box mt={10}>
        <p>Total spent: {formatToUSD(totalSpent)}</p>
        <p>Budget: {formatToUSD(category.budget || 0)}</p>
      </Box>
      {renderRightComponent()}
    </Paper>
  );
};

export default BudgetCategory;

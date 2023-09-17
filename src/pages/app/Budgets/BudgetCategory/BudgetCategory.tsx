import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Paper,
  Progress,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { AlertTriangle, Plus } from "react-feather";
import {
  formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../../helpers/formatToTwoDecimalPlaces";
import { ICategoryWithTransactions } from "../../../../store/useGlobalStore";
import SetupSpendingBudget from "../SetupSpendingBudget/SetupSpendingBudget";

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
        <p>Budget: {formatToUSD(category.budget || 0)}</p>
        <p>Total spent: {formatToUSD(totalSpent)}</p>
        <p>Number of transactions: {category.transactions.length}</p>
      </Box>
      {renderRightComponent()}
    </Paper>
  );
};

export default BudgetCategory;

import { useEffect, useState } from "react";
import { ICategoryWithTransactions } from "../../../../store/useGlobalStore";
import { Badge, Box, Button, Divider, Paper } from "@mantine/core";
import { formatToUSD } from "../../../../helpers/formatToTwoDecimalPlaces";
import { Plus } from "react-feather";
import { openModal } from "@mantine/modals";
import SetupSpendingBudget from "../SetupSpendingBudget/SetupSpendingBudget";

const BudgetCategory = ({
  category,
}: {
  category: ICategoryWithTransactions;
}) => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const total = category.transactions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    setTotalSpent(total);
  }, [category.transactions]);

  return (
    <Paper p={15} withBorder>
      <h3>
        Category: <Badge>{category.name}</Badge>
      </h3>
      <Divider mt={10} />
      <Box mt={10}>
        <p>Total spent: {formatToUSD(totalSpent)}</p>
      </Box>
      {category.budget === null && (
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
      )}
    </Paper>
  );
};

export default BudgetCategory;

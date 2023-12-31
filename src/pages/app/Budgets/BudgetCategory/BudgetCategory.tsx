import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Paper,
  Progress,
  Text,
  Tooltip,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { AlertTriangle, Edit, Plus } from "react-feather";
import {
  formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../../helpers/formatToTwoDecimalPlaces";
import { ICategoryWithTransactions } from "../../../../store/useGlobalStore";
import SetupSpendingBudget from "../SetupSpendingBudget/SetupSpendingBudget";
import TransactionItem from "../../../../components/TransactionHistory/TransactionItem/TransactionItem";

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
      <Flex align="center" justify="space-between">
        <h3>
          Category: <Badge>{category.name}</Badge>
        </h3>
        <Flex align="center">
          <Button
            onClick={() => {
              openModal({
                title: `Transactions for ${category.name}`,
                overlayProps: {
                  blur: 5,
                },
                children: (
                  <>
                    {category.transactions.map((transaction) => {
                      return <TransactionItem transaction={transaction} />;
                    })}
                  </>
                ),
              });
            }}
            variant="subtle"
          >
            See Transactions
          </Button>
          {category.budget !== null && (
            <ActionIcon
              onClick={() => {
                openModal({
                  title: `Set spending for the ${category.name} category`,
                  children: <SetupSpendingBudget category={category} />,
                  overlayProps: {
                    blur: 5,
                  },
                });
              }}
            >
              <Tooltip
                withArrow
                withinPortal
                label={`Edit ${category.name} budget`}
              >
                <Edit size={14} />
              </Tooltip>
            </ActionIcon>
          )}
        </Flex>
      </Flex>

      <Divider mt={10} />
      <Box mt={10}>
        <Flex>
          <Text mr={5}>Budget:</Text>
          <Text fw={800}>{formatToUSD(category.budget || 0)}</Text>
        </Flex>

        <Flex>
          <Text mr={5}>Total spent:</Text>
          <Text fw={800} variant="" color="red">
            {formatToUSD(totalSpent)}
          </Text>
        </Flex>
        <Flex>
          <Text mr={5}>Leftover: </Text>{" "}
          <Text fw={800} color="green">
            {formatToUSD(
              (category.budget || 0) - totalSpent < 0
                ? 0
                : (category.budget || 0) - totalSpent
            )}
          </Text>{" "}
        </Flex>
        <p>Number of transactions: {category.transactions.length}</p>
      </Box>
      {renderRightComponent()}
    </Paper>
  );
};

export default BudgetCategory;

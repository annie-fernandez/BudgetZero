import { Alert, Box, Button, Flex, Paper, Skeleton, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { AlertTriangle, Info, Plus } from "react-feather";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal";
import useGlobalStore from "../../store/useGlobalStore";
import { formatToUSD } from "../../helpers/formatToTwoDecimalPlaces";

const TransactionHistory = (): JSX.Element => {
  const {
    app: { isLoadingTransactions },
    transactions,
  } = useGlobalStore();

  const displayCorrectContent = () => {
    if (isLoadingTransactions) {
      return (
        <div>
          <Skeleton h={50} mt={10} />
          <Skeleton h={50} mt={10} />
          <Skeleton h={50} mt={10} />
          <Skeleton h={50} mt={10} />
          <Skeleton h={50} mt={10} />
          <Skeleton h={50} mt={10} />
        </div>
      );
    }

    if (transactions && transactions.length === 0) {
      return (
        <Alert
          title="No transactions yet"
          color="blue"
          mt={20}
          icon={<Info size={14} />}
        >
          You have no transactions yet. Click the button above to add a new
        </Alert>
      );
    }

    if (!transactions) {
      return (
        <Alert
          title="Error"
          color="red"
          mt={20}
          icon={<AlertTriangle size={14} />}
        >
          Unable to get transactions. Please try again later.
        </Alert>
      );
    }

    return (
      <Paper p={15} mt={20} withBorder>
        {transactions.map((transaction) => {
          return (
            <Box>
              <Flex>
                <Box mr={10}>
                  <Text color="red">-{formatToUSD(transaction.amount)}</Text>
                </Box>

                <div>
                  <Text size={18} weight="bold">
                    {transaction.name}
                  </Text>
                  <p>{transaction.description}</p>
                </div>
              </Flex>
            </Box>
          );
        })}
      </Paper>
    );
  };

  return (
    <div>
      <Button
        onClick={() => {
          openModal({
            title: "Add new transaction",
            children: <AddTransactionModal />,
            size: "lg",
            overlayProps: {
              blur: 5,
            },
          });
        }}
        leftIcon={<Plus size={14} />}
        fullWidth
      >
        Add new transaction
      </Button>
      {displayCorrectContent()}
    </div>
  );
};

export default TransactionHistory;

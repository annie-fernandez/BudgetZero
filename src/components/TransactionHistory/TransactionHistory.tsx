import {
  Alert,
  Badge,
  Box,
  Button,
  Flex,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { AlertTriangle, ExternalLink, Info, Plus } from "react-feather";
import { Link } from "react-router-dom";
import formatDateWithTime from "../../helpers/formatDate";
import { formatToUSD } from "../../helpers/formatToTwoDecimalPlaces";
import useGlobalStore from "../../store/useGlobalStore";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal";

interface ITransaction {
  maxTransactions: number;
  title: string;
  hideSeeAll?: boolean;
}

const TransactionHistory = ({
  maxTransactions,
  title = "Transaction History",
  hideSeeAll = false,
}: ITransaction): JSX.Element => {
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
      <div>
        {transactions.slice(0, maxTransactions).map((transaction) => {
          return (
            <Paper p={10} mt={10}>
              <Flex justify="space-between">
                <div>
                  <Flex align="center">
                    <Text size={18} weight="bold">
                      {transaction.name}
                    </Text>
                    <Badge ml={5}>{transaction?.category?.name}</Badge>
                  </Flex>

                  <Text size={12}>{transaction.description}</Text>
                  <Text color="gray" size={12} mt={5}>
                    {formatDateWithTime(new Date(transaction.created_at))}
                  </Text>
                </div>
                <Box mr={10}>
                  <Text color="red">-{formatToUSD(transaction.amount)}</Text>
                </Box>
              </Flex>
            </Paper>
          );
        })}
        {!hideSeeAll && transactions.length > 5 && (
          <Flex justify="center" mt={20}>
            <Link to="/history">
              <Button leftIcon={<ExternalLink size={14} />}>See All</Button>
            </Link>
          </Flex>
        )}
      </div>
    );
  };

  return (
    <div>
      <Text size={32}>{title}</Text>
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

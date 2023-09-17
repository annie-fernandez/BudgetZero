import { Alert, Button, Flex, Skeleton, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { AlertTriangle, ExternalLink, Info, Plus } from "react-feather";
import { Link } from "react-router-dom";
import useGlobalStore from "../../store/useGlobalStore";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal";
import TransactionItem from "./TransactionItem/TransactionItem";

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
        <Alert title="No transactions yet" mt={20} icon={<Info size={14} />}>
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
          return <TransactionItem transaction={transaction} />;
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

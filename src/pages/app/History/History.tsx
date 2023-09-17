import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";

const History = (): JSX.Element => {
  return (
    <div>
      <TransactionHistory
        title="All Transactions"
        hideSeeAll
        maxTransactions={9999}
      />
    </div>
  );
};

export default History;

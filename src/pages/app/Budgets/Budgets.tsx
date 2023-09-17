import { Alert, Button, Grid, Skeleton } from "@mantine/core";
import useGlobalStore from "../../../store/useGlobalStore";
import BudgetCategory from "./BudgetCategory/BudgetCategory";
import { openModal } from "@mantine/modals";
import AddTransactionModal from "../../../components/TransactionHistory/AddTransactionModal/AddTransactionModal";
import { AlignRight, ArrowRight } from "react-feather";

const Budget = () => {
  const {
    categoriesWithTransactions,
    app: { isLoadingCategoriesWithTransactions },
  } = useGlobalStore();

  const renderCorrectComponent = () => {
    if (isLoadingCategoriesWithTransactions) {
      return (
        <Grid>
          <Grid.Col sm={12} md={6}>
            <Skeleton h={100} />
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Skeleton h={100} />
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Skeleton h={100} />
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Skeleton h={100} />
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Skeleton h={100} />
          </Grid.Col>
        </Grid>
      );
    }

    if (categoriesWithTransactions.length === 0) {
      return (
        <Alert title="No budgets">
          You currently don't have any budgets. Create one by creating a new
          transaction. Budgets get created automatically when you create a
          transaction by category.
          <br />
          <Button
            rightIcon={<ArrowRight size={14} />}
            mt={15}
            onClick={() => {
              openModal({
                title: "Create a new transaction",
                children: <AddTransactionModal />,
              });
            }}
          >
            Add transaction and start your first budget
          </Button>
        </Alert>
      );
    }

    return (
      <Grid>
        {categoriesWithTransactions.map((category) => {
          return (
            <Grid.Col sm={12} md={6}>
              <BudgetCategory category={category} />
            </Grid.Col>
          );
        })}
      </Grid>
    );
  };

  return <div>{renderCorrectComponent()}</div>;
};

export default Budget;

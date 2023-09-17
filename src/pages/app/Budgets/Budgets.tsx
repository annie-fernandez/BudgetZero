import { Grid, Skeleton } from "@mantine/core";
import useGlobalStore from "../../../store/useGlobalStore";
import BudgetCategory from "./BudgetCategory/BudgetCategory";

const Budget = () => {
  const {
    categoriesWithTransactions,
    app: { isLoadingCategoriesWithTransactions },
  } = useGlobalStore();

  const renderCorrectComponent = () => {
    if (isLoadingCategoriesWithTransactions) {
      return (
        <>
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
        </>
      );
    }

    return categoriesWithTransactions.map((category) => {
      return (
        <Grid.Col sm={12} md={6}>
          <BudgetCategory category={category} />
        </Grid.Col>
      );
    });
  };

  return (
    <div>
      <Grid>{renderCorrectComponent()}</Grid>
    </div>
  );
};

export default Budget;

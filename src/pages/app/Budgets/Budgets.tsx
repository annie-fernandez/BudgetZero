import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import BudgetCategory from "./BudgetCategory/BudgetCategory";
import { Grid } from "@mantine/core";

const Budget = () => {
  const { categoriesWithTransactions } = useGlobalStore();

  return (
    <div>
      <Grid>
        {categoriesWithTransactions.map((category) => {
          return (
            <Grid.Col sm={12} md={6}>
              <BudgetCategory category={category} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default Budget;

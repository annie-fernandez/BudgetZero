import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import { formatToTwoDecimalPlaces } from "../../../helpers/formatToTwoDecimalPlaces";
import { Grid } from "@mantine/core";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";

const Dashboard = () => {
  const {
    user: { grossIncome },
  } = useGlobalStore();

  const monthlyIncomeAfterTax = (grossIncome / 12) * 0.7;

  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <h1>
            Monthly Income: {formatToTwoDecimalPlaces(monthlyIncomeAfterTax)}
          </h1>
          <span>Monthly income after estimated 30% tax.</span>
        </Grid.Col>
        <Grid.Col span={6}>
          <TransactionHistory />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;

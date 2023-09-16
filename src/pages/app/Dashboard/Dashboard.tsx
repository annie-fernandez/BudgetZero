import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import {
  //   formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../helpers/formatToTwoDecimalPlaces";
import { Grid } from "@mantine/core";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import Stats from "../../../components/Stats/Stats";

const Dashboard = () => {
  const {
    user: { grossIncome },
  } = useGlobalStore();

  if (!grossIncome) return null;

  const yearlyGrossIncome = formatToUSD(grossIncome);
  // const monthlyGrossIncome = formatToUSD(grossIncome / 12);
  // const monthlyNetIncome = formatToUSD(grossIncome / 12 * taxRate);

  // const unformattedGrossIncome = grossIncome / 12;
  // const unformattedNetIncome = grossIncome / 12 * taxRate
  // const difference = unformattedGrossIncome - unformattedNetIncome;
  // const differenceUSD = formatToUSD(difference);

  const props = {
    total: yearlyGrossIncome,
    diff: 18,
    data: [
      { label: "Mobile", count: "204,001", part: 59, color: "#47d6ab" },
      { label: "Desktop", count: "121,017", part: 35, color: "#03141a" },
      { label: "Tablet", count: "31,118", part: 6, color: "#4fcdf7" },
    ],
  };

  // const yearlyGrossIncomeUSD = formatToUSD(yearlyGrossIncome);

  // const totalYearlyIncome = formatToUSD(grossIncome);

  // const grossMonthly = grossIncome / 12;
  // const formattedGrossMonthly = formatToTwoDecimalPlaces(grossMonthly);

  // const formattedGrossMonthlyUSD = formatToUSD(formattedGrossMonthly);

  // const monthlyIncomeAfterTax = (grossIncome / 12) * 0.7;

  // const formattedMonthlyIncomeAfterTax = formatToUSD(monthlyIncomeAfterTax);

  return (
    <div>
      <Grid>
        <Grid.Col md={6} xs={12}>
          <Stats total={props.total} diff={props.diff} data={props.data} />
        </Grid.Col>
        <Grid.Col md={6} xs={12}>
          <TransactionHistory title="Recent Transactions" maxTransactions={5} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;

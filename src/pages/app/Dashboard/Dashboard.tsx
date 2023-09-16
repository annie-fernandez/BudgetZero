import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import {
  //   formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../helpers/formatToTwoDecimalPlaces";
import { Grid } from "@mantine/core";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import Stats from "../../../components/Stats/Stats";

const Dashboard: React.FC = (): JSX.Element | null => {
  const {
    user: { grossIncome },
  } = useGlobalStore();

  if (!grossIncome) return null;

  const tax =  7;
  const taxRate = 1 - (tax / 100);

  const grossIncomeUSD = formatToUSD(grossIncome);
  const yearlyNetIncome = formatToUSD(taxRate * (grossIncome / 12) * 12);

  const monthlyGrossIncome = formatToUSD(grossIncome / 12);
  const monthlyNetIncome = formatToUSD(grossIncome / 12 * taxRate);
  const monthlyTaxReduction = formatToUSD(grossIncome / 12 - (grossIncome / 12 * taxRate));

  const props = {
    grossTotal: grossIncomeUSD,
    total: yearlyNetIncome,
    diff: tax,
    data: [
      { label: "Monthly Gross Income", count: monthlyGrossIncome, part: 59, color: "#47d6ab" },
      { label: "Monthly Net Income", count: monthlyNetIncome, part: 35, color: "#03141a" },
      { label: "Monthly Tax Reduction", count: monthlyTaxReduction, part: 6, color: "#4fcdf7" }
    ]
  };
  
  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <Stats grossTotal={props.grossTotal} total={props.total} diff={props.diff} data={props.data} />
        </Grid.Col>
        <Grid.Col md={6} xs={12}>
          <TransactionHistory />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Dashboard;

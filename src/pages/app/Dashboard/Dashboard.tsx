import { Box, Grid, Tabs } from "@mantine/core";
import React from "react";
import IncomeStats from "../../../components/Stats/IncomeStats";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import {
  //   formatToTwoDecimalPlaces,
  formatToUSD,
} from "../../../helpers/formatToTwoDecimalPlaces";
import useGlobalStore from "../../../store/useGlobalStore";
import Budget from "../Budgets/Budgets";
import SpentEachDay from "../Graphs/SpentEachDay/SpentEachDay";
import SpentOvertime from "../Graphs/SpentOverTime/SpentOverTime";
import { DollarSign, PieChart } from "react-feather";

const Dashboard: React.FC = (): JSX.Element | null => {
  const {
    user: { grossIncome },
  } = useGlobalStore();

  if (!grossIncome) return null;

  const tax = 7;
  const taxRate = 1 - tax / 100;

  const grossIncomeUSD = formatToUSD(grossIncome);
  const yearlyNetIncome = formatToUSD(taxRate * (grossIncome / 12) * 12);

  const monthlyGrossIncome = formatToUSD(grossIncome / 12);
  const monthlyNetIncome = formatToUSD((grossIncome / 12) * taxRate);
  const monthlyTaxReduction = formatToUSD(
    grossIncome / 12 - (grossIncome / 12) * taxRate
  );

  const props = {
    grossTotal: grossIncomeUSD,
    total: yearlyNetIncome,
    diff: tax,
    data: [
      {
        label: "Monthly Gross Income",
        count: monthlyGrossIncome,
        part: 59,
        color: "#15aabf",
      },
      {
        label: "Monthly Net Income",
        count: monthlyNetIncome,
        part: 35,
        color: "#03141a",
      },
      {
        label: "Monthly Tax Reduction",
        count: monthlyTaxReduction,
        part: 6,
        color: "#15aabf",
      },
    ],
  };

  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <IncomeStats
            grossTotal={props.grossTotal}
            total={props.total}
            diff={props.diff}
            data={props.data}
          />
        </Grid.Col>
        <Grid.Col md={6} xs={12}>
          <TransactionHistory title="Recent Transactions" maxTransactions={5} />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}></Grid.Col>
      </Grid>
      <Tabs mt={30} defaultValue="budgets">
        <Tabs.List mb={20}>
          <Tabs.Tab icon={<DollarSign size={14} />} value="budgets">
            Budgets
          </Tabs.Tab>
          <Tabs.Tab icon={<PieChart size={14} />} value="visuals">
            Visuals
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="budgets" pt="xs">
          <Budget />
        </Tabs.Panel>

        <Tabs.Panel value="visuals" pt="xs">
          <Grid>
            <Grid.Col span={6}>
              <SpentEachDay />
            </Grid.Col>
            <Grid.Col md={6} xs={12}>
              <SpentOvertime />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
      <Box mt={100} />
    </div>
  );
};

export default Dashboard;

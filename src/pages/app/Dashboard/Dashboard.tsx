import { Box, Grid, Tabs } from "@mantine/core";
import React from "react";
import { DollarSign, PieChart } from "react-feather";
import IncomeStats from "../../../components/Stats/IncomeStats";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import Budget from "../Budgets/Budgets";
import SpentEachDay from "../Graphs/SpentEachDay/SpentEachDay";
import SpentOvertime from "../Graphs/SpentOverTime/SpentOverTime";

const Dashboard: React.FC = (): JSX.Element | null => {
  return (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <IncomeStats />
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

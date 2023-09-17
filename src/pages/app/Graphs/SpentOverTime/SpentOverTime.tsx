// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useGlobalStore from "../../../../store/useGlobalStore";
import { Text } from "@mantine/core";

const SpentOverTime = () => {
  const { transactions } = useGlobalStore();

  const getGraphData = () => {
    const groupedByDay = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.created_at);
      const dayKey = `${date.getUTCFullYear()}-${
        date.getUTCMonth() + 1
      }-${date.getUTCDate()}`;

      if (!acc[dayKey]) {
        acc[dayKey] = { totalAmount: 0, count: 0 };
      }

      acc[dayKey].totalAmount += transaction.amount;
      acc[dayKey].count += 1;

      return acc;
    }, {});

    const graphData = Object.keys(groupedByDay).map((dayKey) => {
      const dayOfMonth = dayKey.split("-")[2]; // Extracting the day from the dayKey
      return {
        name: dayOfMonth,
        uv: groupedByDay[dayKey].count,
        pv: groupedByDay[dayKey].count * 2, // Sample calculation, adjust as needed
        amt: groupedByDay[dayKey].totalAmount,
      };
    });

    return graphData.toReversed();
  };

  console.log(getGraphData());

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={getGraphData()}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#15aabf" fill="#15aabf" />
        </AreaChart>
      </ResponsiveContainer>
      <Text align="center" size={12}>
        You need to use the app everyday to populate this data.
      </Text>
    </div>
  );
};

export default SpentOverTime;

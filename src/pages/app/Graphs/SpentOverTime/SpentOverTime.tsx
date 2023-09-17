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
import { getGraphDataOverTime } from "../helpers/getGraphDataOvertime";

const SpentOverTime = () => {
  const { transactions } = useGlobalStore();

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={getGraphDataOverTime({ transactions })}
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
        Cumulative money spent over time.
      </Text>
    </div>
  );
};

export default SpentOverTime;

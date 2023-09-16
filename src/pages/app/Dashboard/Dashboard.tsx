import React from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import { formatToTwoDecimalPlaces } from "../../../helpers/formatToTwoDecimalPlaces";

const Dashboard = () => {
  const {
    user: { grossIncome },
  } = useGlobalStore();

  const monthlyIncomeAfterTax = (grossIncome / 12) * 0.7;

  return (
    <div>
      <h1>Monthly Income: {formatToTwoDecimalPlaces(monthlyIncomeAfterTax)}</h1>
      <span>Monthly income after estimated 30% tax.</span>
    </div>
  );
};

export default Dashboard;

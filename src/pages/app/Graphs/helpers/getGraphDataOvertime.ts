// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const getGraphDataOverTime = ({ transactions }) => {
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

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert grouped data into desired graph format
  let accumulatedAmt = 0; // Initialize a variable to keep track of the accumulated amount

  const sortedKeys = Object.keys(groupedByDay).sort(); // Sort the keys
  const graphData = sortedKeys.map((dayKey) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, dayOfMonth] = dayKey.split("-");
    const formattedName = `${monthNames[parseInt(month) - 1]} ${dayOfMonth}`;

    accumulatedAmt += groupedByDay[dayKey].totalAmount; // Accumulate the amount for each day

    return {
      name: formattedName,
      uv: groupedByDay[dayKey].count,
      pv: groupedByDay[dayKey].count * 2, // Sample calculation, adjust as needed
      amt: accumulatedAmt, // Set the accumulated amount for the graph
    };
  });

  return graphData;
};

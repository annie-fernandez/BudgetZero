import { Button } from "@mantine/core";
import React from "react";
import { Plus } from "react-feather";

const TransactionHistory = (): JSX.Element => {
  return (
    <div>
      <Button leftIcon={<Plus size={14} />} fullWidth>
        Add new transaction
      </Button>
    </div>
  );
};

export default TransactionHistory;

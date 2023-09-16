import { Button } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { Plus } from "react-feather";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal";

const TransactionHistory = (): JSX.Element => {
  return (
    <div>
      <Button
        onClick={() => {
          openModal({
            title: "Add new transaction",
            children: <AddTransactionModal />,
            size: "lg",
            overlayProps: {
              blur: 5,
            },
          });
        }}
        leftIcon={<Plus size={14} />}
        fullWidth
      >
        Add new transaction
      </Button>
    </div>
  );
};

export default TransactionHistory;

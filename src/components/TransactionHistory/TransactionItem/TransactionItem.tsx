import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import formatDateWithTime from "../../../helpers/formatDate";
import { formatToUSD } from "../../../helpers/formatToTwoDecimalPlaces";
import { ITransactions } from "../../../store/useGlobalStore";
import { Edit } from "react-feather";
import { openModal } from "@mantine/modals";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";

interface Props {
  transaction: ITransactions;
}

const TransactionItem = ({ transaction }: Props) => {
  return (
    <Paper p={10} mt={10}>
      <Flex justify="space-between">
        <div>
          <Flex align="center">
            <Text size={18} weight="bold">
              {transaction.name}
            </Text>
            <Badge ml={5}>{transaction?.category?.name}</Badge>
            <Tooltip label="Edit transaction">
              <ActionIcon
                onClick={() => {
                  openModal({
                    title: "Edit transaction",
                    children: <AddTransactionModal transaction={transaction} />,
                    overlayProps: {
                      blur: 5,
                    },
                  });
                }}
              >
                <Edit size={12} />
              </ActionIcon>
            </Tooltip>
          </Flex>

          <Text size={12}>{transaction.description}</Text>
          <Text color="gray" size={12} mt={5}>
            {formatDateWithTime(new Date(transaction.created_at))}
          </Text>
        </div>
        <Box mr={10}>
          <Text color="red">-{formatToUSD(transaction.amount)}</Text>
        </Box>
      </Flex>
    </Paper>
  );
};

export default TransactionItem;

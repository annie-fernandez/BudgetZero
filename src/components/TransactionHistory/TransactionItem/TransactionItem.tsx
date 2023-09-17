import { Badge, Box, Flex, Paper, Text } from "@mantine/core";
import formatDateWithTime from "../../../helpers/formatDate";
import { formatToUSD } from "../../../helpers/formatToTwoDecimalPlaces";
import { ITransactions } from "../../../store/useGlobalStore";

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

import { Button, Divider, Flex, TextInput } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { HardDrive, Trash } from "react-feather";
import { useForm } from "react-hook-form";
import { Database } from "../../../../../types/database.types";
import useGlobalStore, {
  ICategoryWithTransactions,
} from "../../../../store/useGlobalStore";
import { moneyValidation } from "../../../../helpers/formatToTwoDecimalPlaces";
import { IconCurrencyDollar } from "@tabler/icons-react";

interface IFormValues {
  amount: number;
}

export default function SetupSpendingBudget({
  category,
}: {
  category: ICategoryWithTransactions;
}) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const { fetchTransactions, fetchCategoriesWithTransactions } =
    useGlobalStore();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({});

  const onSubmit = handleSubmit(async (data) => {
    if (session?.user.id === null) return;

    setIsLoading(true);
    console.log(data.amount)
    const { error: resError } = await supabase
      .from("categories")
      .update({
        budget: data.amount,
        user_id: session?.user.id || "",
        id: category.id,
      })
      .eq("id", category.id);

    setIsLoading(false);

    if (resError) {
      return showNotification({
        title: "Error",
        message: "Something went wrong",
      });
    }

    fetchTransactions({ supabase });
    fetchCategoriesWithTransactions({ supabase });
    closeAllModals();
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        {...register("amount", {
          required: "A spending budget is required",
          valueAsNumber: true,
          minLength: {
            value: 1,
            message: "At least 1 characters",
          },

          validate: (value) => {
            if (value !== undefined) {
              const string = value?.toString();
              return moneyValidation(string) === -1 ? "Invalid currency format." : true;
            }
          },
         
        })}
        error={errors.amount?.message}
        label="Target amount"
        placeholder="500"
        withAsterisk
        icon={ <IconCurrencyDollar size={15}/>}
      />
      <Divider mt={20} mb={20} />
      <Flex justify="end">
        <Button
          leftIcon={<Trash size={14} />}
          variant="subtle"
          mr={10}
          onClick={() => closeAllModals()}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          type="submit"
          leftIcon={<HardDrive size={14} />}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
}

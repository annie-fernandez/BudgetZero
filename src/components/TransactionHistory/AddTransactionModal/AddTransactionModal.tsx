import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Select,
  TextInput,
} from "@mantine/core";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import { Database } from "../../../../types/database.types";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

interface IFormValues {
  name: string;
  amount: number;
  description: string;
  dueDate: string | null;
}

const AddTransactionModal = (): JSX.Element => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const [isRecurring, setIsRecurring] = React.useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({});

  const onSubmit = handleSubmit(async (data) => {
    if (session?.user.id === null) return;

    setIsLoading(true);

    const { error: resError } = await supabase.from("transactions").insert({
      amount: data.amount,
      name: data.name || "",
      user_id: session?.user.id || "",
      description: data.description || "",
      due_date: dueDate ? parseInt(dueDate) : null,
    });

    setIsLoading(false);

    if (resError) {
      return showNotification({
        title: "Error",
        message: "Something went wrong",
      });
    }

    closeAllModals();
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        {...register("name", {
          required: "Transaction name is required",
          minLength: {
            value: 1,
            message: "At least 5 letters",
          },
        })}
        description="What was this transaction for? (e.g. Rent, Groceries, etc.)"
        error={errors.name?.message}
        label="Name"
        placeholder="Rent"
        withAsterisk
      />
      <TextInput
        mt={10}
        {...register("description")}
        description="Brief description of this transaction"
        error={errors.description?.message}
        label="Description"
        placeholder="This was too much money"
      />
      <TextInput
        mt={10}
        type="number"
        {...register("amount", {
          required: "This transaction's amount is required",
          minLength: {
            value: 3,
            message: "At least 3 characters",
          },
        })}
        error={errors.amount?.message}
        label="Transaction Amount"
        placeholder="100"
        withAsterisk
      />
      <br />
      <Checkbox
        checked={isRecurring}
        onChange={(event) => setIsRecurring(event.currentTarget.checked)}
        description="e.g. Bills, Subscription, etc."
        label="Recurring transaction"
      />
      {isRecurring && (
        <Select
          onChange={setDueDate}
          error={errors.dueDate?.message}
          withinPortal
          withAsterisk
          required
          mt={10}
          searchable
          nothingFound="Days only go from 1 - 31"
          label="Due Date"
          description="Day of the month this transaction is  due"
          placeholder="Pick one"
          data={days.map((day) => ({
            value: day.toString(),
            label: day.toString(),
          }))}
        />
      )}
      <Divider mb={20} mt={20} />
      <Flex justify="end">
        <Button
          loading={isLoading}
          rightIcon={<ArrowRight size={16} />}
          type="submit"
        >
          Add Transaction
        </Button>
      </Flex>
    </form>
  );
};

export default AddTransactionModal;
